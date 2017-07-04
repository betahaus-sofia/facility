/// <reference path="../node_modules/compote/components/index.d.ts" />

interface Process {
  VERSION: string;
  env: Record<string, any>;
}

type Action<ActionType> = {
  type?: ActionType
};

declare var process: Process;
