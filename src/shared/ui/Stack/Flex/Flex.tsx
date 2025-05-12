import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import cls from "./styles.module.css";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexGap = "4" | "8" | "16" | "24" | "32";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexWrap = "nowrap" | "wrap";

const justifyClasses: Record<FlexJustify, string> = {
  between: cls.justifyBetween,
  center: cls.justifyCenter,
  start: cls.justifyStart,
  end: cls.justifyEnd,
};

const alignClasses: Record<FlexAlign, string> = {
  center: cls.alignCenter,
  start: cls.alignStart,
  end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  column: cls.directionColumn,
  row: cls.directionRow,
};

const gapClasses: Record<FlexGap, string> = {
  32: cls.gap32,
  24: cls.gap24,
  16: cls.gap16,
  8: cls.gap8,
  4: cls.gap4,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  direction: FlexDirection;
  justify?: FlexJustify;
  children: ReactNode;
  className?: string;
  align?: FlexAlign;
  wrap?: FlexWrap;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
	justify = "start",
	direction = "row",
	align = "center",
	wrap = "nowrap",
	className,
	children,
	gap,
	max,
	...otherProps
}) => {
  const classes = [
    cls.Flex,
		directionClasses[direction],
    justifyClasses[justify],
    gap && gapClasses[gap],
    alignClasses[align],
		max && cls.max,
    className,
    cls[wrap],
  ].filter(Boolean);

  return (
    <div className={classes.join(' ')} {...otherProps}>
      {children}
    </div>
  );
};
