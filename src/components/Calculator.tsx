import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import styles from './Calculator.module.css';

export default function Calculator({ onClose }: { onClose: () => void }) {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 320, y: 100 });
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, initX: pos.x, initY: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.initX + dx,
      y: dragRef.current.initY + dy
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const append = (c: string) => {
    setExpr(prev => prev + c);
  };

  const clear = () => {
    setExpr('');
    setResult('');
  };

  const backspace = () => {
    setExpr(prev => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      // Basic safe evaluation replacing common symbols
      let toEval = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');
      
      // Handle sqrt(x)
      toEval = toEval.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
      
      // eslint-disable-next-line no-new-func
      const res = new Function(`return ${toEval}`)();
      if (res !== undefined && !Number.isNaN(res)) {
        setResult(Number(res).toPrecision(10).replace(/\.?0+$/, ''));
      } else {
        setResult('Error');
      }
    } catch {
      setResult('Error');
    }
  };

  return (
    <div 
      className={styles.calcWidget} 
      style={{ left: pos.x, top: pos.y }}
    >
      <div 
        className={styles.calcHeader}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span>Calculator</span>
        <button 
          className={styles.closeBtn} 
          onPointerDown={(e) => {
            e.stopPropagation(); // Prevent drag from capturing the pointer
            onClose();
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className={styles.calcBody}>
        <div className={styles.display}>
          <div className={styles.expr}>{expr || '0'}</div>
          <div className={styles.res}>{result ? `= ${result}` : ''}</div>
        </div>
        <div className={styles.keypad}>
          <button onClick={() => append('(')}>(</button>
          <button onClick={() => append(')')}>)</button>
          <button onClick={() => append('^')}>^</button>
          <button onClick={clear} className={styles.keyClear}>C</button>
          
          <button onClick={() => append('sqrt(')}>√</button>
          <button onClick={() => append('%')}>%</button>
          <button onClick={backspace}>⌫</button>
          <button onClick={() => append('÷')} className={styles.keyOp}>÷</button>
          
          <button onClick={() => append('7')}>7</button>
          <button onClick={() => append('8')}>8</button>
          <button onClick={() => append('9')}>9</button>
          <button onClick={() => append('×')} className={styles.keyOp}>×</button>
          
          <button onClick={() => append('4')}>4</button>
          <button onClick={() => append('5')}>5</button>
          <button onClick={() => append('6')}>6</button>
          <button onClick={() => append('-')} className={styles.keyOp}>-</button>
          
          <button onClick={() => append('1')}>1</button>
          <button onClick={() => append('2')}>2</button>
          <button onClick={() => append('3')}>3</button>
          <button onClick={() => append('+')} className={styles.keyOp}>+</button>
          
          <button onClick={() => append('0')} className={styles.keyZero}>0</button>
          <button onClick={() => append('.')}>.</button>
          <button onClick={calculate} className={styles.keyEq}>=</button>
        </div>
      </div>
    </div>
  );
}
