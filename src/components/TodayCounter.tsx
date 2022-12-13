import { useSpring, animated } from '@react-spring/web';

interface IProps {
  fill?: number;
  referenceElement: number;
  comparedElement: number;
  widthMeasured: number;
}

const CounterDiv = ({
  comparedElement,
  referenceElement,
  widthMeasured,
}: IProps) => {
  const widthCalc = (() => {
    if (referenceElement < comparedElement) {
      return (widthMeasured / comparedElement) * referenceElement;
    }

    return widthMeasured;
  })();

  const { width, number, opacity } = useSpring({
    from: { width: 0, opacity: 0, number: 0 },
    width: widthCalc,
    opacity: 1,
    number: referenceElement,
    delay: 300,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.div className={'fill'} style={{ width, opacity }}>
      <animated.div>{number.to((n: number) => n.toFixed(0))}</animated.div>
    </animated.div>
  );
};

export default CounterDiv;
