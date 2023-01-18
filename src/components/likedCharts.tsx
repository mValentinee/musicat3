import type { FC } from "react";

/**
 * use zod here ? later make it work first
 *TODO just get the api data, try through trpc , understand react query
 */

type ChartCardProps = {
  data: string[];
};

const ChartCardMarkUp = ({}) => {
  // const { key, number }<> = [
  //   {
  //     "key": 1,
  //   },
  //   {
  //     "key": 2,
  //   },
  // ];

  return (
    <div className=".absolute">
      {"key"}
      {"number"}
    </div>
  );
};

const LikedChart: FC<ChartCardProps> = ({}) => {
  return <div>LikedChart</div>;
};

export default LikedChart;
