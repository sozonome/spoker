export enum HideLabelOptions {
  monkey,
  chicken,
  cow,
  fish,
  money,
}

export type HideLabelOptionsType = keyof typeof HideLabelOptions;

export const hideLabelOptions: Array<HideLabelOptionsType> = Object.keys(
  HideLabelOptions
)
  .filter((label) => Number.isNaN(Number(label)))
  .map((labelOption) => labelOption as HideLabelOptionsType);

type HideLabelType = Record<
  HideLabelOptionsType,
  {
    empty: string;
    selected: string;
  }
>;

export const hideLabel: HideLabelType = {
  monkey: {
    empty: "🙊",
    selected: "🙉",
  },
  chicken: {
    empty: "🥚",
    selected: "🐣",
  },
  cow: {
    empty: "🐄",
    selected: "🥛",
  },
  fish: {
    empty: "🐟",
    selected: "🎣",
  },
  money: {
    empty: "💸",
    selected: "💰",
  },
};
