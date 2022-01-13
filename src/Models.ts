export interface WAQueryResponse {
  queryresult: WAQueryResult;
}

export interface WAQueryResult {
  success: boolean;
  error: boolean;
  numpods: number;
  datatypes: string;
  timedout: string;
  timedoutpods: string;
  timing: number;
  parsetiming: number;
  parsetimedout: boolean;
  recalculate: string;
  id: string;
  host: string;
  server: string;
  related: string;
  version: string;
  inputstring: string;
  pods: Pod[];
  assumptions: Assumptions;
  sources: Sources;
}

export interface Assumptions {
  type: string;
  word: string;
  template: string;
  count: number;
  values: Value[];
}

export interface Value {
  name: string;
  desc: string;
  input: string;
}

export interface Pod {
  title: string;
  scanner: string;
  id: string;
  position: number;
  error: boolean;
  numsubpods: number;
  subpods: SubPod[];
  expressiontypes: ExpressionTypes;
  primary?: boolean;
}

export interface ExpressionTypes {
  name: string;
}

export interface SubPod {
  title: string;
  plaintext: string;
  microsources?: MicroSources;
}

export interface MicroSources {
  microsource: string;
}

export interface Sources {
  url: string;
  text: string;
}
