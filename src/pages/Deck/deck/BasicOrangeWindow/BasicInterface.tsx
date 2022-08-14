
export interface BasicProps {
  children?: JSX.Element |JSX.Element[];
  deckFinished?: boolean;
  index: number;
  generateRandom?: Function;
  menu?: false | JSX.Element;
  questionAnswerWindow?: boolean;
  questionViewActive?: boolean;
  setEdit?:(prop?:boolean) => void;
  setEditModeActive?:(prop:boolean) => void;
  setScrollbarVisible: (prop?:boolean) => void;
  settings?: boolean;
  setShow: (prop:boolean) => void;
  setShowAnswerBtn?:(prop?:boolean) => void;
  show?: boolean;
  showFromParent?: boolean;
  stats?: boolean;
  title?: string | JSX.Element | undefined;
}