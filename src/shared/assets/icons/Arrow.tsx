interface ArrowProps {
  width: number;
  height: number;
}

const Arrow = ({width,height}: ArrowProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.00327479 18.3885L1.42231 19.8076L11.3223 9.90386L1.41839 -2.0115e-05L-4.46866e-06 1.41838L8.4867 9.90509L0.00327479 18.3885Z" fill="#1C1C1E"/>
    </svg>
  )
}

export default Arrow