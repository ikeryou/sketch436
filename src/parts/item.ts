import { Color, Vector3 } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { MousePointer } from "../core/mousePointer";
import { Func } from "../core/func";
import { HSL } from "../libs/hsl";
import { Conf } from "../core/conf";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _num: number
  private _key: number
  private _dist: number = 0
  private _rot: Vector3 = new Vector3()
  private _baseCol: Vector3 = new Vector3()

  constructor(opt:any) {
    super(opt)

    this._num = opt.num
    this._baseCol.x = Util.random(0, 1)
    this._c = 0

    this._key = opt.key
    this.addClass('material-symbols-outlined')

    this._changeIcon()

    this.useGPU(this.el)
  }

  private _makeShadow(ang: number, color: Color, interval: number):string {
    let radius = 0;
    const num = Func.val(5, 5);

    let res = '';
    for(var i = 0; i <= num; i++) {
      const col = color.clone()
      col.offsetHSL(Util.map(i, 0, 0.2, 0, num), 0, Util.map(i, 0, 0.1, 0, num))
      let rad = Util.radian(ang)
      let x = ~~(Math.sin(rad * 1) * radius);
      let y = ~~(Math.cos(rad * 1) * radius);
      res += x + 'px ' + y + 'px 0px ' + col.getStyle();
      if(i != num) {
        res += ', ';
      }
      radius += interval;
    }

    return res;
  }

  private _changeIcon():void {
    this._baseCol.x = Util.random(0, 1)
    // this.el.innerHTML = Util.randomArr(Conf.instance.ICONS)
    this.el.innerHTML = Conf.instance.ICONS[0]
  }

  protected _update():void {
    super._update();

    const sw = Func.sw()
    const sh = Func.sh()

    const maxDist = Math.max(sw, sh) * 0.2

    const fontSize = Func.val(200, 300)



    const ease = 0.1

    this._dist += (MousePointer.instance.dist - this._dist) * ease
    const it = Util.map(this._dist, 2, 50, 0, maxDist)

    const radius = Math.min(sw, sh) * Util.map(this._dist, 0.1, 0.4, 0, maxDist)
    const rad = Util.radian((360 / this._num) * this._key)
    const x = Math.sin(rad) * radius + sw * 0.5 - fontSize * 0.5
    const y = Math.cos(rad) * radius + sh * 0.5 - fontSize * 0.5

    const dx = sw * 0.5 - MousePointer.instance.x
    const dy = sh * 0.5 - MousePointer.instance.y

    // 向き
    const tgRot = Util.radian(Util.degree(Math.atan2(dy, dx)) + 135 + (this._key * 0 + this._c * 0));
    const PI2 = Math.PI * 2;
    const PI3 = Math.PI * 3;
    const diff = (tgRot - this._rot.z % PI2 + PI3) % PI2 - Math.PI
    const newtgRot = this._rot.z + diff
    this._rot.z += (newtgRot - this._rot.z) * ease
    const ang = this._rot.z

    const hsl = new HSL()
    hsl.s = 1
    hsl.l = 0.5
    hsl.h = Util.map(this._key, 0.8, 1, 0, this._num - 1)
    const col = new Color().setHSL(hsl.h, hsl.s, hsl.l)

    // const txtCol = col.clone()
    const txtCol = new Color(0x000000)
    // txtCol.offsetHSL(this._key * 10, 0.25, 0.25)

    const txtShadow = this._makeShadow(ang, col, it)

    Tween.set(this.el, {
      x: x + Math.sin(this._key * 0 + this._c * 0.05) * 15,
      y: y + Math.sin(this._key * 0 + this._c * -0.089) * 15,
      rotationZ: Util.degree(this._rot.z),
      textShadow:txtShadow,
      fontSize: fontSize + 'px',
      color: txtCol.getStyle()
    })
  }
}







