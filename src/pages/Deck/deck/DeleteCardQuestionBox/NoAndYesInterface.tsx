export interface NoAndYesProps {
  data:{
  card: string;
  deleteCurrentCard:(prop?:boolean) => void;
  deleteWindow:Function;
  index:number;
  pauseCardinQuestionAnswer:boolean;
  randomQuestion:number;
  resetQuestionText: boolean;
  setEditModeActive:(prop:boolean) => void;
  setShowAnswerBtn:(prop?:boolean) => void;
  trashEvent:Function,
}
}