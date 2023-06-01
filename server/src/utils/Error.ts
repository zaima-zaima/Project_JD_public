class ErrorHandler extends Error {
  code: number;
  msg: string;
  constructor(code: number, msg: string) {
    super();
    this.code = code;
    this.msg = msg;
  }
}

export class Expire extends ErrorHandler {
  constructor(msg: string) {
    super(401, msg);
  }
}

export class NotFound extends ErrorHandler {
  constructor(msg: string) {
    super(404, msg);
  }
}

export class Params extends ErrorHandler {
  constructor(msg?: string) {
    super(400, msg || "参数错误");
  }
}

export class Uploads extends ErrorHandler {
  constructor(msg: string) {
    super(402, msg);
  }
}

export class Forbiden extends ErrorHandler {
  constructor(msg?: string) {
    super(409, msg || "禁止访问");
  }
}

export class UnkownError extends ErrorHandler {
  constructor() {
    super(500, "服务器错误");
  }
}

export default {
  Expire,
  NotFound,
  Params,
  Uploads,
  Forbiden,
  UnkownError,
};
