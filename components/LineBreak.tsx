import { Fragment } from "react";

interface Props {
  str: string;
  doubleBreak?: boolean;
  limit?: number;
}
const LineBreak = ({ str, doubleBreak, limit }: Props) => {
  return (
    <>
      {
        //return the string with <br> tags in place of \n
        limit
          ? str.length > limit
            ? str
                .slice(0, limit)
                .split("\n")
                .map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <span>{item}</span>
                      <br />
                      {doubleBreak && <br />}
                    </Fragment>
                  );
                })
            : str.split("\n").map((item, index) => {
                return (
                  <Fragment key={index}>
                    <span>{item}</span>
                    <br />
                    {doubleBreak && <br />}
                  </Fragment>
                );
              })
          : str.split("\n").map((item, index) => {
              return (
                <Fragment key={index}>
                  <span>{item}</span>
                  <br />
                  {doubleBreak && <br />}
                </Fragment>
              );
            })
      }
    </>
  );
};

export default LineBreak;
