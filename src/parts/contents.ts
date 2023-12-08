// import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    const num = Func.val(20, 40)
    for (let i = 0; i < num; i++) {
      const div = document.createElement('div')
      div.classList.add('js-item')
      this.el.appendChild(div)
    }

    this.qsAll('.js-item').forEach((el:HTMLElement, i:number) => {
      this._item.push(new Item({
        el: el,
        key: i,
        num: num
      }))
    })

    this._resize()
  }

  protected _update():void {
    super._update()
  }

  protected _resize(): void {
    super._resize()
  }
}