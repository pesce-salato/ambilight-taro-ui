export class CustomAbortSignal {
  private _v = false
  private listeners: (() => void)[] = []

  public get value(): boolean {
    return this._v
  }

  public addTriggerEventListener = (listener: () => void) => {
    this.listeners.push(listener)
  }

  public trigger = () => {
    this._v = true

    for (const listener of this.listeners) {
      try {
        listener()
      } catch {
        // ignore error
      }
    }
  }
}

export class CustomAbortError extends Error {}

export class CustomAbortController {
  public signal = new CustomAbortSignal()

  public abort = () => {
    this.signal.trigger()
  }
}
