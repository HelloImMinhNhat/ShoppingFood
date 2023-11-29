(function (X, ne) {
  "object" == typeof exports && typeof module < "u"
    ? (module.exports = ne())
    : "function" == typeof define && define.amd
    ? define(ne)
    : ((X = typeof globalThis < "u" ? globalThis : X || self).bootstrap = ne());
})(this, function () {
  "use strict";
  const X = new Map(),
    ne = {
      set(n, e, t) {
        X.has(n) || X.set(n, new Map());
        const i = X.get(n);
        i.has(e) || 0 === i.size
          ? i.set(e, t)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                Array.from(i.keys())[0]
              }.`
            );
      },
      get: (n, e) => (X.has(n) && X.get(n).get(e)) || null,
      remove(n, e) {
        if (!X.has(n)) return;
        const t = X.get(n);
        t.delete(e), 0 === t.size && X.delete(n);
      },
    },
    Ue = "transitionend",
    _e = (n) => (
      n &&
        window.CSS &&
        window.CSS.escape &&
        (n = n.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
      n
    ),
    qt = (n) => {
      n.dispatchEvent(new Event(Ue));
    },
    fe = (n) =>
      !(!n || "object" != typeof n) &&
      (void 0 !== n.jquery && (n = n[0]), void 0 !== n.nodeType),
    De = (n) =>
      fe(n)
        ? n.jquery
          ? n[0]
          : n
        : "string" == typeof n && n.length > 0
        ? document.querySelector(_e(n))
        : null,
    Se = (n) => {
      if (!fe(n) || 0 === n.getClientRects().length) return !1;
      const e =
          "visible" === getComputedStyle(n).getPropertyValue("visibility"),
        t = n.closest("details:not([open])");
      if (!t) return e;
      if (t !== n) {
        const i = n.closest("summary");
        if ((i && i.parentNode !== t) || null === i) return !1;
      }
      return e;
    },
    Ie = (n) =>
      !n ||
      n.nodeType !== Node.ELEMENT_NODE ||
      !!n.classList.contains("disabled") ||
      (void 0 !== n.disabled
        ? n.disabled
        : n.hasAttribute("disabled") && "false" !== n.getAttribute("disabled")),
    rn = (n) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof n.getRootNode) {
        const e = n.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return n instanceof ShadowRoot
        ? n
        : n.parentNode
        ? rn(n.parentNode)
        : null;
    },
    Xe = () => {},
    je = () =>
      window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
        ? window.jQuery
        : null,
    Ne = [],
    he = () => "rtl" === document.documentElement.dir,
    oe = (n) => {
      var e;
      (e = () => {
        const t = je();
        if (t) {
          const i = n.NAME,
            r = t.fn[i];
          (t.fn[i] = n.jQueryInterface),
            (t.fn[i].Constructor = n),
            (t.fn[i].noConflict = () => ((t.fn[i] = r), n.jQueryInterface));
        }
      }),
        "loading" === document.readyState
          ? (Ne.length ||
              document.addEventListener("DOMContentLoaded", () => {
                for (const t of Ne) t();
              }),
            Ne.push(e))
          : e();
    },
    ce = (n, e = [], t = n) => ("function" == typeof n ? n(...e) : t),
    Dn = (n, e, t = !0) => {
      if (!t) return void ce(n);
      const i =
        ((c) => {
          if (!c) return 0;
          let { transitionDuration: f, transitionDelay: m } =
            window.getComputedStyle(c);
          const w = Number.parseFloat(f),
            x = Number.parseFloat(m);
          return w || x
            ? ((f = f.split(",")[0]),
              (m = m.split(",")[0]),
              1e3 * (Number.parseFloat(f) + Number.parseFloat(m)))
            : 0;
        })(e) + 5;
      let r = !1;
      const a = ({ target: c }) => {
        c === e && ((r = !0), e.removeEventListener(Ue, a), ce(n));
      };
      e.addEventListener(Ue, a),
        setTimeout(() => {
          r || qt(e);
        }, i);
    },
    Et = (n, e, t, i) => {
      const r = n.length;
      let a = n.indexOf(e);
      return -1 === a
        ? !t && i
          ? n[r - 1]
          : n[0]
        : ((a += t ? 1 : -1),
          i && (a = (a + r) % r),
          n[Math.max(0, Math.min(a, r - 1))]);
    },
    Ut = /[^.]*(?=\..*)\.|.*/,
    Sn = /\..*/,
    At = /::\d+$/,
    an = {};
  let ln = 1;
  const pt = { mouseenter: "mouseover", mouseleave: "mouseout" },
    pe = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function ve(n, e) {
    return (e && `${e}::${ln++}`) || n.uidEvent || ln++;
  }
  function be(n) {
    const e = ve(n);
    return (n.uidEvent = e), (an[e] = an[e] || {}), an[e];
  }
  function de(n, e, t = null) {
    return Object.values(n).find(
      (i) => i.callable === e && i.delegationSelector === t
    );
  }
  function Xt(n, e, t) {
    const i = "string" == typeof e,
      r = i ? t : e || t;
    let a = cn(n);
    return pe.has(a) || (a = n), [i, r, a];
  }
  function mt(n, e, t, i, r) {
    if ("string" != typeof e || !n) return;
    let [a, c, f] = Xt(e, t, i);
    var P;
    e in pt &&
      ((P = c),
      (c = function (D) {
        if (
          !D.relatedTarget ||
          (D.relatedTarget !== D.delegateTarget &&
            !D.delegateTarget.contains(D.relatedTarget))
        )
          return P.call(this, D);
      }));
    const m = be(n),
      w = m[f] || (m[f] = {}),
      x = de(w, c, a ? t : null);
    if (x) return void (x.oneOff = x.oneOff && r);
    const b = ve(c, e.replace(Ut, "")),
      N = a
        ? (function (k, P, D) {
            return function M(G) {
              const te = k.querySelectorAll(P);
              for (let { target: F } = G; F && F !== this; F = F.parentNode)
                for (const U of te)
                  if (U === F)
                    return (
                      Kt(G, { delegateTarget: F }),
                      M.oneOff && h.off(k, G.type, P, D),
                      D.apply(F, [G])
                    );
            };
          })(n, t, c)
        : (function (k, P) {
            return function D(M) {
              return (
                Kt(M, { delegateTarget: k }),
                D.oneOff && h.off(k, M.type, P),
                P.apply(k, [M])
              );
            };
          })(n, c);
    (N.delegationSelector = a ? t : null),
      (N.callable = c),
      (N.oneOff = r),
      (N.uidEvent = b),
      (w[b] = N),
      n.addEventListener(f, N, a);
  }
  function et(n, e, t, i, r) {
    const a = de(e[t], i, r);
    a && (n.removeEventListener(t, a, !!r), delete e[t][a.uidEvent]);
  }
  function Ot(n, e, t, i) {
    const r = e[t] || {};
    for (const [a, c] of Object.entries(r))
      a.includes(i) && et(n, e, t, c.callable, c.delegationSelector);
  }
  function cn(n) {
    return (n = n.replace(Sn, "")), pt[n] || n;
  }
  const h = {
    on(n, e, t, i) {
      mt(n, e, t, i, !1);
    },
    one(n, e, t, i) {
      mt(n, e, t, i, !0);
    },
    off(n, e, t, i) {
      if ("string" != typeof e || !n) return;
      const [r, a, c] = Xt(e, t, i),
        f = c !== e,
        m = be(n),
        w = m[c] || {},
        x = e.startsWith(".");
      if (void 0 === a) {
        if (x) for (const b of Object.keys(m)) Ot(n, m, b, e.slice(1));
        for (const [b, N] of Object.entries(w)) {
          const k = b.replace(At, "");
          (f && !e.includes(k)) ||
            et(n, m, c, N.callable, N.delegationSelector);
        }
      } else {
        if (!Object.keys(w).length) return;
        et(n, m, c, a, r ? t : null);
      }
    },
    trigger(n, e, t) {
      if ("string" != typeof e || !n) return null;
      const i = je();
      let r = null,
        a = !0,
        c = !0,
        f = !1;
      e !== cn(e) &&
        i &&
        ((r = i.Event(e, t)),
        i(n).trigger(r),
        (a = !r.isPropagationStopped()),
        (c = !r.isImmediatePropagationStopped()),
        (f = r.isDefaultPrevented()));
      const m = Kt(new Event(e, { bubbles: a, cancelable: !0 }), t);
      return (
        f && m.preventDefault(),
        c && n.dispatchEvent(m),
        m.defaultPrevented && r && r.preventDefault(),
        m
      );
    },
  };
  function Kt(n, e = {}) {
    for (const [t, i] of Object.entries(e))
      try {
        n[t] = i;
      } catch {
        Object.defineProperty(n, t, { configurable: !0, get: () => i });
      }
    return n;
  }
  function un(n) {
    if ("true" === n) return !0;
    if ("false" === n) return !1;
    if (n === Number(n).toString()) return Number(n);
    if ("" === n || "null" === n) return null;
    if ("string" != typeof n) return n;
    try {
      return JSON.parse(decodeURIComponent(n));
    } catch {
      return n;
    }
  }
  function fn(n) {
    return n.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
  }
  const Ke = {
    setDataAttribute(n, e, t) {
      n.setAttribute(`data-bs-${fn(e)}`, t);
    },
    removeDataAttribute(n, e) {
      n.removeAttribute(`data-bs-${fn(e)}`);
    },
    getDataAttributes(n) {
      if (!n) return {};
      const e = {},
        t = Object.keys(n.dataset).filter(
          (i) => i.startsWith("bs") && !i.startsWith("bsConfig")
        );
      for (const i of t) {
        let r = i.replace(/^bs/, "");
        (r = r.charAt(0).toLowerCase() + r.slice(1, r.length)),
          (e[r] = un(n.dataset[i]));
      }
      return e;
    },
    getDataAttribute: (n, e) => un(n.getAttribute(`data-bs-${fn(e)}`)),
  };
  class gt {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    _getConfig(e) {
      return (
        (e = this._mergeConfigObj(e)),
        (e = this._configAfterMerge(e)),
        this._typeCheckConfig(e),
        e
      );
    }
    _configAfterMerge(e) {
      return e;
    }
    _mergeConfigObj(e, t) {
      const i = fe(t) ? Ke.getDataAttribute(t, "config") : {};
      return {
        ...this.constructor.Default,
        ...("object" == typeof i ? i : {}),
        ...(fe(t) ? Ke.getDataAttributes(t) : {}),
        ...("object" == typeof e ? e : {}),
      };
    }
    _typeCheckConfig(e, t = this.constructor.DefaultType) {
      for (const [r, a] of Object.entries(t)) {
        const c = e[r],
          f = fe(c)
            ? "element"
            : null == (i = c)
            ? `${i}`
            : Object.prototype.toString
                .call(i)
                .match(/\s([a-z]+)/i)[1]
                .toLowerCase();
        if (!new RegExp(a).test(f))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${f}" but expected type "${a}".`
          );
      }
      var i;
    }
  }
  class ye extends gt {
    constructor(e, t) {
      super(),
        (e = De(e)) &&
          ((this._element = e),
          (this._config = this._getConfig(t)),
          ne.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      ne.remove(this._element, this.constructor.DATA_KEY),
        h.off(this._element, this.constructor.EVENT_KEY);
      for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
    }
    _queueCallback(e, t, i = !0) {
      Dn(e, t, i);
    }
    _getConfig(e) {
      return (
        (e = this._mergeConfigObj(e, this._element)),
        (e = this._configAfterMerge(e)),
        this._typeCheckConfig(e),
        e
      );
    }
    static getInstance(e) {
      return ne.get(De(e), this.DATA_KEY);
    }
    static getOrCreateInstance(e, t = {}) {
      return (
        this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
      );
    }
    static get VERSION() {
      return "5.3.2";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(e) {
      return `${e}${this.EVENT_KEY}`;
    }
  }
  const Yt = (n) => {
      let e = n.getAttribute("data-bs-target");
      if (!e || "#" === e) {
        let t = n.getAttribute("href");
        if (!t || (!t.includes("#") && !t.startsWith("."))) return null;
        t.includes("#") && !t.startsWith("#") && (t = `#${t.split("#")[1]}`),
          (e = t && "#" !== t ? _e(t.trim()) : null);
      }
      return e;
    },
    O = {
      find: (n, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, n)),
      findOne: (n, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, n),
      children: (n, e) => [].concat(...n.children).filter((t) => t.matches(e)),
      parents(n, e) {
        const t = [];
        let i = n.parentNode.closest(e);
        for (; i; ) t.push(i), (i = i.parentNode.closest(e));
        return t;
      },
      prev(n, e) {
        let t = n.previousElementSibling;
        for (; t; ) {
          if (t.matches(e)) return [t];
          t = t.previousElementSibling;
        }
        return [];
      },
      next(n, e) {
        let t = n.nextElementSibling;
        for (; t; ) {
          if (t.matches(e)) return [t];
          t = t.nextElementSibling;
        }
        return [];
      },
      focusableChildren(n) {
        const e = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((t) => `${t}:not([tabindex^="-"])`)
          .join(",");
        return this.find(e, n).filter((t) => !Ie(t) && Se(t));
      },
      getSelectorFromElement(n) {
        const e = Yt(n);
        return e && O.findOne(e) ? e : null;
      },
      getElementFromSelector(n) {
        const e = Yt(n);
        return e ? O.findOne(e) : null;
      },
      getMultipleElementsFromSelector(n) {
        const e = Yt(n);
        return e ? O.find(e) : [];
      },
    },
    we = (n, e = "hide") => {
      const i = n.NAME;
      h.on(
        document,
        `click.dismiss${n.EVENT_KEY}`,
        `[data-bs-dismiss="${i}"]`,
        function (r) {
          if (
            (["A", "AREA"].includes(this.tagName) && r.preventDefault(),
            Ie(this))
          )
            return;
          const a = O.getElementFromSelector(this) || this.closest(`.${i}`);
          n.getOrCreateInstance(a)[e]();
        }
      );
    },
    at = ".bs.alert",
    dn = `close${at}`,
    jn = `closed${at}`;
  class _t extends ye {
    static get NAME() {
      return "alert";
    }
    close() {
      if (h.trigger(this._element, dn).defaultPrevented) return;
      this._element.classList.remove("show");
      const e = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, e);
    }
    _destroyElement() {
      this._element.remove(), h.trigger(this._element, jn), this.dispose();
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = _t.getOrCreateInstance(this);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e](this);
        }
      });
    }
  }
  we(_t, "close"), oe(_t);
  const hn = '[data-bs-toggle="button"]';
  class He extends ye {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = He.getOrCreateInstance(this);
        "toggle" === e && t[e]();
      });
    }
  }
  h.on(document, "click.bs.button.data-api", hn, (n) => {
    n.preventDefault();
    const e = n.target.closest(hn);
    He.getOrCreateInstance(e).toggle();
  }),
    oe(He);
  const lt = ".bs.swipe",
    Pn = `touchstart${lt}`,
    pn = `touchmove${lt}`,
    Qt = `touchend${lt}`,
    mn = `pointerdown${lt}`,
    gn = `pointerup${lt}`,
    ni = { endCallback: null, leftCallback: null, rightCallback: null },
    Mn = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)",
    };
  class vt extends gt {
    constructor(e, t) {
      super(),
        (this._element = e),
        e &&
          vt.isSupported() &&
          ((this._config = this._getConfig(t)),
          (this._deltaX = 0),
          (this._supportPointerEvents = !!window.PointerEvent),
          this._initEvents());
    }
    static get Default() {
      return ni;
    }
    static get DefaultType() {
      return Mn;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      h.off(this._element, lt);
    }
    _start(e) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
        : (this._deltaX = e.touches[0].clientX);
    }
    _end(e) {
      this._eventIsPointerPenTouch(e) &&
        (this._deltaX = e.clientX - this._deltaX),
        this._handleSwipe(),
        ce(this._config.endCallback);
    }
    _move(e) {
      this._deltaX =
        e.touches && e.touches.length > 1
          ? 0
          : e.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const e = Math.abs(this._deltaX);
      if (e <= 40) return;
      const t = e / this._deltaX;
      (this._deltaX = 0),
        t && ce(t > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? (h.on(this._element, mn, (e) => this._start(e)),
          h.on(this._element, gn, (e) => this._end(e)),
          this._element.classList.add("pointer-event"))
        : (h.on(this._element, Pn, (e) => this._start(e)),
          h.on(this._element, pn, (e) => this._move(e)),
          h.on(this._element, Qt, (e) => this._end(e)));
    }
    _eventIsPointerPenTouch(e) {
      return (
        this._supportPointerEvents &&
        ("pen" === e.pointerType || "touch" === e.pointerType)
      );
    }
    static isSupported() {
      return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const Fe = ".bs.carousel",
    _n = ".data-api",
    Tt = "next",
    Ye = "prev",
    bt = "left",
    Ct = "right",
    ii = `slide${Fe}`,
    Gt = `slid${Fe}`,
    kt = `keydown${Fe}`,
    $n = `mouseenter${Fe}`,
    In = `mouseleave${Fe}`,
    Nn = `dragstart${Fe}`,
    Hn = `load${Fe}${_n}`,
    Fn = `click${Fe}${_n}`,
    Wn = "carousel",
    Lt = "active",
    Bn = ".active",
    o = ".carousel-item",
    s = Bn + o,
    l = { ArrowLeft: Ct, ArrowRight: bt },
    u = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    v = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean",
    };
  class d extends ye {
    constructor(e, t) {
      super(e, t),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = O.findOne(
          ".carousel-indicators",
          this._element
        )),
        this._addEventListeners(),
        this._config.ride === Wn && this.cycle();
    }
    static get Default() {
      return u;
    }
    static get DefaultType() {
      return v;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(Tt);
    }
    nextWhenVisible() {
      !document.hidden && Se(this._element) && this.next();
    }
    prev() {
      this._slide(Ye);
    }
    pause() {
      this._isSliding && qt(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval
        ));
    }
    _maybeEnableCycle() {
      this._config.ride &&
        (this._isSliding
          ? h.one(this._element, Gt, () => this.cycle())
          : this.cycle());
    }
    to(e) {
      const t = this._getItems();
      if (e > t.length - 1 || e < 0) return;
      if (this._isSliding)
        return void h.one(this._element, Gt, () => this.to(e));
      const i = this._getItemIndex(this._getActive());
      i !== e && this._slide(e > i ? Tt : Ye, t[e]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(e) {
      return (e.defaultInterval = e.interval), e;
    }
    _addEventListeners() {
      this._config.keyboard && h.on(this._element, kt, (e) => this._keydown(e)),
        "hover" === this._config.pause &&
          (h.on(this._element, $n, () => this.pause()),
          h.on(this._element, In, () => this._maybeEnableCycle())),
        this._config.touch &&
          vt.isSupported() &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t of O.find(".carousel-item img", this._element))
        h.on(t, Nn, (i) => i.preventDefault());
      this._swipeHelper = new vt(this._element, {
        leftCallback: () => this._slide(this._directionToOrder(bt)),
        rightCallback: () => this._slide(this._directionToOrder(Ct)),
        endCallback: () => {
          "hover" === this._config.pause &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval
            )));
        },
      });
    }
    _keydown(e) {
      if (/input|textarea/i.test(e.target.tagName)) return;
      const t = l[e.key];
      t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
    }
    _getItemIndex(e) {
      return this._getItems().indexOf(e);
    }
    _setActiveIndicatorElement(e) {
      if (!this._indicatorsElement) return;
      const t = O.findOne(Bn, this._indicatorsElement);
      t.classList.remove(Lt), t.removeAttribute("aria-current");
      const i = O.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
      i && (i.classList.add(Lt), i.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const e = this._activeElement || this._getActive();
      if (!e) return;
      const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
      this._config.interval = t || this._config.defaultInterval;
    }
    _slide(e, t = null) {
      if (this._isSliding) return;
      const i = this._getActive(),
        r = e === Tt,
        a = t || Et(this._getItems(), i, r, this._config.wrap);
      if (a === i) return;
      const c = this._getItemIndex(a),
        f = (b) =>
          h.trigger(this._element, b, {
            relatedTarget: a,
            direction: this._orderToDirection(e),
            from: this._getItemIndex(i),
            to: c,
          });
      if (f(ii).defaultPrevented || !i || !a) return;
      const m = !!this._interval;
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(c),
        (this._activeElement = a);
      const w = r ? "carousel-item-start" : "carousel-item-end",
        x = r ? "carousel-item-next" : "carousel-item-prev";
      a.classList.add(x),
        i.classList.add(w),
        a.classList.add(w),
        this._queueCallback(
          () => {
            a.classList.remove(w, x),
              a.classList.add(Lt),
              i.classList.remove(Lt, x, w),
              (this._isSliding = !1),
              f(Gt);
          },
          i,
          this._isAnimated()
        ),
        m && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return O.findOne(s, this._element);
    }
    _getItems() {
      return O.find(o, this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(e) {
      return he() ? (e === bt ? Ye : Tt) : e === bt ? Tt : Ye;
    }
    _orderToDirection(e) {
      return he() ? (e === Ye ? bt : Ct) : e === Ye ? Ct : bt;
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = d.getOrCreateInstance(this, e);
        if ("number" != typeof e) {
          if ("string" == typeof e) {
            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
              throw new TypeError(`No method named "${e}"`);
            t[e]();
          }
        } else t.to(e);
      });
    }
  }
  h.on(document, Fn, "[data-bs-slide], [data-bs-slide-to]", function (n) {
    const e = O.getElementFromSelector(this);
    if (!e || !e.classList.contains(Wn)) return;
    n.preventDefault();
    const t = d.getOrCreateInstance(e),
      i = this.getAttribute("data-bs-slide-to");
    return i
      ? (t.to(i), void t._maybeEnableCycle())
      : "next" === Ke.getDataAttribute(this, "slide")
      ? (t.next(), void t._maybeEnableCycle())
      : (t.prev(), void t._maybeEnableCycle());
  }),
    h.on(window, Hn, () => {
      const n = O.find('[data-bs-ride="carousel"]');
      for (const e of n) d.getOrCreateInstance(e);
    }),
    oe(d);
  const g = ".bs.collapse",
    p = `show${g}`,
    _ = `shown${g}`,
    A = `hide${g}`,
    E = `hidden${g}`,
    y = `click${g}.data-api`,
    z = "show",
    L = "collapse",
    I = "collapsing",
    B = `:scope .${L} .${L}`,
    $ = '[data-bs-toggle="collapse"]',
    ie = { parent: null, toggle: !0 },
    ee = { parent: "(null|element)", toggle: "boolean" };
  class W extends ye {
    constructor(e, t) {
      super(e, t), (this._isTransitioning = !1), (this._triggerArray = []);
      const i = O.find($);
      for (const r of i) {
        const a = O.getSelectorFromElement(r),
          c = O.find(a).filter((f) => f === this._element);
        null !== a && c.length && this._triggerArray.push(r);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return ie;
    }
    static get DefaultType() {
      return ee;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let e = [];
      if (
        (this._config.parent &&
          (e = this._getFirstLevelChildren(
            ".collapse.show, .collapse.collapsing"
          )
            .filter((r) => r !== this._element)
            .map((r) => W.getOrCreateInstance(r, { toggle: !1 }))),
        (e.length && e[0]._isTransitioning) ||
          h.trigger(this._element, p).defaultPrevented)
      )
        return;
      for (const r of e) r.hide();
      const t = this._getDimension();
      this._element.classList.remove(L),
        this._element.classList.add(I),
        (this._element.style[t] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const i = `scroll${t[0].toUpperCase() + t.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(I),
            this._element.classList.add(L, z),
            (this._element.style[t] = ""),
            h.trigger(this._element, _);
        },
        this._element,
        !0
      ),
        (this._element.style[t] = `${this._element[i]}px`);
    }
    hide() {
      if (
        this._isTransitioning ||
        !this._isShown() ||
        h.trigger(this._element, A).defaultPrevented
      )
        return;
      const e = this._getDimension();
      (this._element.style[e] = `${
        this._element.getBoundingClientRect()[e]
      }px`),
        this._element.classList.add(I),
        this._element.classList.remove(L, z);
      for (const t of this._triggerArray) {
        const i = O.getElementFromSelector(t);
        i && !this._isShown(i) && this._addAriaAndCollapsedClass([t], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[e] = ""),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(I),
              this._element.classList.add(L),
              h.trigger(this._element, E);
          },
          this._element,
          !0
        );
    }
    _isShown(e = this._element) {
      return e.classList.contains(z);
    }
    _configAfterMerge(e) {
      return (e.toggle = !!e.toggle), (e.parent = De(e.parent)), e;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal")
        ? "width"
        : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const e = this._getFirstLevelChildren($);
      for (const t of e) {
        const i = O.getElementFromSelector(t);
        i && this._addAriaAndCollapsedClass([t], this._isShown(i));
      }
    }
    _getFirstLevelChildren(e) {
      const t = O.find(B, this._config.parent);
      return O.find(e, this._config.parent).filter((i) => !t.includes(i));
    }
    _addAriaAndCollapsedClass(e, t) {
      if (e.length)
        for (const i of e)
          i.classList.toggle("collapsed", !t),
            i.setAttribute("aria-expanded", t);
    }
    static jQueryInterface(e) {
      const t = {};
      return (
        "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
        this.each(function () {
          const i = W.getOrCreateInstance(this, t);
          if ("string" == typeof e) {
            if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
            i[e]();
          }
        })
      );
    }
  }
  h.on(document, y, $, function (n) {
    ("A" === n.target.tagName ||
      (n.delegateTarget && "A" === n.delegateTarget.tagName)) &&
      n.preventDefault();
    for (const e of O.getMultipleElementsFromSelector(this))
      W.getOrCreateInstance(e, { toggle: !1 }).toggle();
  }),
    oe(W);
  var S = "top",
    T = "bottom",
    C = "right",
    j = "left",
    q = "auto",
    R = [S, T, C, j],
    K = "start",
    re = "end",
    Ce = "clippingParents",
    xe = "viewport",
    me = "popper",
    Pe = "reference",
    se = R.reduce(function (n, e) {
      return n.concat([e + "-" + K, e + "-" + re]);
    }, []),
    We = [].concat(R, [q]).reduce(function (n, e) {
      return n.concat([e, e + "-" + K, e + "-" + re]);
    }, []),
    tt = "beforeRead",
    ct = "afterRead",
    ke = "beforeMain",
    St = "afterMain",
    jt = "beforeWrite",
    vn = "afterWrite",
    bn = [tt, "read", ct, ke, "main", St, jt, "write", vn];
  function Ee(n) {
    return n ? (n.nodeName || "").toLowerCase() : null;
  }
  function Ae(n) {
    if (null == n) return window;
    if ("[object Window]" !== n.toString()) {
      var e = n.ownerDocument;
      return (e && e.defaultView) || window;
    }
    return n;
  }
  function ut(n) {
    return n instanceof Ae(n).Element || n instanceof Element;
  }
  function ge(n) {
    return n instanceof Ae(n).HTMLElement || n instanceof HTMLElement;
  }
  function yn(n) {
    return (
      typeof ShadowRoot < "u" &&
      (n instanceof Ae(n).ShadowRoot || n instanceof ShadowRoot)
    );
  }
  const Jt = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (n) {
      var e = n.state;
      Object.keys(e.elements).forEach(function (t) {
        var i = e.styles[t] || {},
          r = e.attributes[t] || {},
          a = e.elements[t];
        ge(a) &&
          Ee(a) &&
          (Object.assign(a.style, i),
          Object.keys(r).forEach(function (c) {
            var f = r[c];
            !1 === f
              ? a.removeAttribute(c)
              : a.setAttribute(c, !0 === f ? "" : f);
          }));
      });
    },
    effect: function (n) {
      var e = n.state,
        t = {
          popper: {
            position: e.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(e.elements.popper.style, t.popper),
        (e.styles = t),
        e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow),
        function () {
          Object.keys(e.elements).forEach(function (i) {
            var r = e.elements[i],
              a = e.attributes[i] || {},
              c = Object.keys(
                e.styles.hasOwnProperty(i) ? e.styles[i] : t[i]
              ).reduce(function (f, m) {
                return (f[m] = ""), f;
              }, {});
            ge(r) &&
              Ee(r) &&
              (Object.assign(r.style, c),
              Object.keys(a).forEach(function (f) {
                r.removeAttribute(f);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  function Be(n) {
    return n.split("-")[0];
  }
  var nt = Math.max,
    Mt = Math.min,
    yt = Math.round;
  function wn() {
    var n = navigator.userAgentData;
    return null != n && n.brands && Array.isArray(n.brands)
      ? n.brands
          .map(function (e) {
            return e.brand + "/" + e.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function it() {
    return !/^((?!chrome|android).)*safari/i.test(wn());
  }
  function Qe(n, e, t) {
    void 0 === e && (e = !1), void 0 === t && (t = !1);
    var i = n.getBoundingClientRect(),
      r = 1,
      a = 1;
    e &&
      ge(n) &&
      ((r = (n.offsetWidth > 0 && yt(i.width) / n.offsetWidth) || 1),
      (a = (n.offsetHeight > 0 && yt(i.height) / n.offsetHeight) || 1));
    var c = (ut(n) ? Ae(n) : window).visualViewport,
      f = !it() && t,
      m = (i.left + (f && c ? c.offsetLeft : 0)) / r,
      w = (i.top + (f && c ? c.offsetTop : 0)) / a,
      x = i.width / r,
      b = i.height / a;
    return {
      width: x,
      height: b,
      top: w,
      right: m + x,
      bottom: w + b,
      left: m,
      x: m,
      y: w,
    };
  }
  function Zt(n) {
    var e = Qe(n),
      t = n.offsetWidth,
      i = n.offsetHeight;
    return (
      Math.abs(e.width - t) <= 1 && (t = e.width),
      Math.abs(e.height - i) <= 1 && (i = e.height),
      { x: n.offsetLeft, y: n.offsetTop, width: t, height: i }
    );
  }
  function xn(n, e) {
    var t = e.getRootNode && e.getRootNode();
    if (n.contains(e)) return !0;
    if (t && yn(t)) {
      var i = e;
      do {
        if (i && n.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function Me(n) {
    return Ae(n).getComputedStyle(n);
  }
  function Rn(n) {
    return ["table", "td", "th"].indexOf(Ee(n)) >= 0;
  }
  function Ge(n) {
    return (
      (ut(n) ? n.ownerDocument : n.document) || window.document
    ).documentElement;
  }
  function $t(n) {
    return "html" === Ee(n)
      ? n
      : n.assignedSlot || n.parentNode || (yn(n) ? n.host : null) || Ge(n);
  }
  function En(n) {
    return ge(n) && "fixed" !== Me(n).position ? n.offsetParent : null;
  }
  function It(n) {
    for (var e = Ae(n), t = En(n); t && Rn(t) && "static" === Me(t).position; )
      t = En(t);
    return t &&
      ("html" === Ee(t) || ("body" === Ee(t) && "static" === Me(t).position))
      ? e
      : t ||
          (function (i) {
            var r = /firefox/i.test(wn());
            if (/Trident/i.test(wn()) && ge(i) && "fixed" === Me(i).position)
              return null;
            var a = $t(i);
            for (
              yn(a) && (a = a.host);
              ge(a) && ["html", "body"].indexOf(Ee(a)) < 0;

            ) {
              var c = Me(a);
              if (
                "none" !== c.transform ||
                "none" !== c.perspective ||
                "paint" === c.contain ||
                -1 !== ["transform", "perspective"].indexOf(c.willChange) ||
                (r && "filter" === c.willChange) ||
                (r && c.filter && "none" !== c.filter)
              )
                return a;
              a = a.parentNode;
            }
            return null;
          })(n) ||
          e;
  }
  function An(n) {
    return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
  }
  function ft(n, e, t) {
    return nt(n, Mt(e, t));
  }
  function On(n) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, n);
  }
  function Ti(n, e) {
    return e.reduce(function (t, i) {
      return (t[i] = n), t;
    }, {});
  }
  const Ci = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (n) {
      var e,
        J,
        Q,
        t = n.state,
        i = n.name,
        r = n.options,
        a = t.elements.arrow,
        c = t.modifiersData.popperOffsets,
        f = Be(t.placement),
        m = An(f),
        w = [j, C].indexOf(f) >= 0 ? "height" : "width";
      if (a && c) {
        var x =
            ((Q = t),
            On(
              "number" !=
                typeof (J =
                  "function" == typeof (J = r.padding)
                    ? J(Object.assign({}, Q.rects, { placement: Q.placement }))
                    : J)
                ? J
                : Ti(J, R)
            )),
          b = Zt(a),
          N = "y" === m ? S : j,
          k = "y" === m ? T : C,
          P =
            t.rects.reference[w] +
            t.rects.reference[m] -
            c[m] -
            t.rects.popper[w],
          D = c[m] - t.rects.reference[m],
          M = It(a),
          G = M ? ("y" === m ? M.clientHeight || 0 : M.clientWidth || 0) : 0,
          H = G / 2 - b[w] / 2 + (P / 2 - D / 2),
          V = ft(x[N], H, G - b[w] - x[k]);
        t.modifiersData[i] = (((e = {})[m] = V), (e.centerOffset = V - H), e);
      }
    },
    effect: function (n) {
      var e = n.state,
        t = n.options.element,
        i = void 0 === t ? "[data-popper-arrow]" : t;
      null != i &&
        ("string" != typeof i || (i = e.elements.popper.querySelector(i))) &&
        xn(e.elements.popper, i) &&
        (e.elements.arrow = i);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function en(n) {
    return n.split("-")[1];
  }
  var Is = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function ki(n) {
    var e,
      t = n.popper,
      i = n.popperRect,
      r = n.placement,
      a = n.variation,
      c = n.offsets,
      f = n.position,
      m = n.gpuAcceleration,
      w = n.adaptive,
      x = n.roundOffsets,
      b = n.isFixed,
      N = c.x,
      k = void 0 === N ? 0 : N,
      P = c.y,
      D = void 0 === P ? 0 : P,
      M = "function" == typeof x ? x({ x: k, y: D }) : { x: k, y: D };
    (k = M.x), (D = M.y);
    var G = c.hasOwnProperty("x"),
      te = c.hasOwnProperty("y"),
      F = j,
      U = S,
      H = window;
    if (w) {
      var V = It(t),
        Y = "clientHeight",
        J = "clientWidth";
      V === Ae(t) &&
        "static" !== Me((V = Ge(t))).position &&
        "absolute" === f &&
        ((Y = "scrollHeight"), (J = "scrollWidth")),
        (r === S || ((r === j || r === C) && a === re)) &&
          ((U = T),
          (D -=
            (b && V === H && H.visualViewport
              ? H.visualViewport.height
              : V[Y]) - i.height),
          (D *= m ? 1 : -1)),
        (r !== j && ((r !== S && r !== T) || a !== re)) ||
          ((F = C),
          (k -=
            (b && V === H && H.visualViewport ? H.visualViewport.width : V[J]) -
            i.width),
          (k *= m ? 1 : -1));
    }
    var Q,
      Ze,
      Oe,
      Ve,
      ae,
      le = Object.assign({ position: f }, w && Is),
      $e =
        !0 === x
          ? ((Ze = { x: k, y: D }),
            (Oe = Ae(t)),
            (Ve = Ze.y),
            {
              x: yt(Ze.x * (ae = Oe.devicePixelRatio || 1)) / ae || 0,
              y: yt(Ve * ae) / ae || 0,
            })
          : { x: k, y: D };
    return (
      (k = $e.x),
      (D = $e.y),
      Object.assign(
        {},
        le,
        m
          ? (((Q = {})[U] = te ? "0" : ""),
            (Q[F] = G ? "0" : ""),
            (Q.transform =
              (H.devicePixelRatio || 1) <= 1
                ? "translate(" + k + "px, " + D + "px)"
                : "translate3d(" + k + "px, " + D + "px, 0)"),
            Q)
          : (((e = {})[U] = te ? D + "px" : ""),
            (e[F] = G ? k + "px" : ""),
            (e.transform = ""),
            e)
      )
    );
  }
  const si = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: function (n) {
      var e = n.state,
        t = n.options,
        i = t.gpuAcceleration,
        r = void 0 === i || i,
        a = t.adaptive,
        c = void 0 === a || a,
        f = t.roundOffsets,
        m = void 0 === f || f,
        w = {
          placement: Be(e.placement),
          variation: en(e.placement),
          popper: e.elements.popper,
          popperRect: e.rects.popper,
          gpuAcceleration: r,
          isFixed: "fixed" === e.options.strategy,
        };
      null != e.modifiersData.popperOffsets &&
        (e.styles.popper = Object.assign(
          {},
          e.styles.popper,
          ki(
            Object.assign({}, w, {
              offsets: e.modifiersData.popperOffsets,
              position: e.options.strategy,
              adaptive: c,
              roundOffsets: m,
            })
          )
        )),
        null != e.modifiersData.arrow &&
          (e.styles.arrow = Object.assign(
            {},
            e.styles.arrow,
            ki(
              Object.assign({}, w, {
                offsets: e.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: m,
              })
            )
          )),
        (e.attributes.popper = Object.assign({}, e.attributes.popper, {
          "data-popper-placement": e.placement,
        }));
    },
    data: {},
  };
  var zn = { passive: !0 };
  const oi = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (n) {
      var e = n.state,
        t = n.instance,
        i = n.options,
        r = i.scroll,
        a = void 0 === r || r,
        c = i.resize,
        f = void 0 === c || c,
        m = Ae(e.elements.popper),
        w = [].concat(e.scrollParents.reference, e.scrollParents.popper);
      return (
        a &&
          w.forEach(function (x) {
            x.addEventListener("scroll", t.update, zn);
          }),
        f && m.addEventListener("resize", t.update, zn),
        function () {
          a &&
            w.forEach(function (x) {
              x.removeEventListener("scroll", t.update, zn);
            }),
            f && m.removeEventListener("resize", t.update, zn);
        }
      );
    },
    data: {},
  };
  var Ns = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Vn(n) {
    return n.replace(/left|right|bottom|top/g, function (e) {
      return Ns[e];
    });
  }
  var Hs = { start: "end", end: "start" };
  function Li(n) {
    return n.replace(/start|end/g, function (e) {
      return Hs[e];
    });
  }
  function ri(n) {
    var e = Ae(n);
    return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
  }
  function ai(n) {
    return Qe(Ge(n)).left + ri(n).scrollLeft;
  }
  function li(n) {
    var e = Me(n);
    return /auto|scroll|overlay|hidden/.test(
      e.overflow + e.overflowY + e.overflowX
    );
  }
  function Di(n) {
    return ["html", "body", "#document"].indexOf(Ee(n)) >= 0
      ? n.ownerDocument.body
      : ge(n) && li(n)
      ? n
      : Di($t(n));
  }
  function Tn(n, e) {
    var t;
    void 0 === e && (e = []);
    var i = Di(n),
      r = i === (null == (t = n.ownerDocument) ? void 0 : t.body),
      a = Ae(i),
      c = r ? [a].concat(a.visualViewport || [], li(i) ? i : []) : i,
      f = e.concat(c);
    return r ? f : f.concat(Tn($t(c)));
  }
  function ci(n) {
    return Object.assign({}, n, {
      left: n.x,
      top: n.y,
      right: n.x + n.width,
      bottom: n.y + n.height,
    });
  }
  function Si(n, e, t) {
    return e === xe
      ? ci(
          (function (i, r) {
            var a = Ae(i),
              c = Ge(i),
              f = a.visualViewport,
              m = c.clientWidth,
              w = c.clientHeight,
              x = 0,
              b = 0;
            if (f) {
              (m = f.width), (w = f.height);
              var N = it();
              (N || (!N && "fixed" === r)) &&
                ((x = f.offsetLeft), (b = f.offsetTop));
            }
            return { width: m, height: w, x: x + ai(i), y: b };
          })(n, t)
        )
      : ut(e)
      ? (((a = Qe((i = e), !1, "fixed" === t)).top = a.top + i.clientTop),
        (a.left = a.left + i.clientLeft),
        (a.bottom = a.top + i.clientHeight),
        (a.right = a.left + i.clientWidth),
        (a.width = i.clientWidth),
        (a.height = i.clientHeight),
        (a.x = a.left),
        (a.y = a.top),
        a)
      : ci(
          (function (i) {
            var r,
              a = Ge(i),
              c = ri(i),
              f = null == (r = i.ownerDocument) ? void 0 : r.body,
              m = nt(
                a.scrollWidth,
                a.clientWidth,
                f ? f.scrollWidth : 0,
                f ? f.clientWidth : 0
              ),
              w = nt(
                a.scrollHeight,
                a.clientHeight,
                f ? f.scrollHeight : 0,
                f ? f.clientHeight : 0
              ),
              x = -c.scrollLeft + ai(i),
              b = -c.scrollTop;
            return (
              "rtl" === Me(f || a).direction &&
                (x += nt(a.clientWidth, f ? f.clientWidth : 0) - m),
              { width: m, height: w, x, y: b }
            );
          })(Ge(n))
        );
    var i, a;
  }
  function ji(n) {
    var e,
      t = n.reference,
      i = n.element,
      r = n.placement,
      a = r ? Be(r) : null,
      c = r ? en(r) : null,
      f = t.x + t.width / 2 - i.width / 2,
      m = t.y + t.height / 2 - i.height / 2;
    switch (a) {
      case S:
        e = { x: f, y: t.y - i.height };
        break;
      case T:
        e = { x: f, y: t.y + t.height };
        break;
      case C:
        e = { x: t.x + t.width, y: m };
        break;
      case j:
        e = { x: t.x - i.width, y: m };
        break;
      default:
        e = { x: t.x, y: t.y };
    }
    var w = a ? An(a) : null;
    if (null != w) {
      var x = "y" === w ? "height" : "width";
      switch (c) {
        case K:
          e[w] = e[w] - (t[x] / 2 - i[x] / 2);
          break;
        case re:
          e[w] = e[w] + (t[x] / 2 - i[x] / 2);
      }
    }
    return e;
  }
  function tn(n, e) {
    void 0 === e && (e = {});
    var Oe,
      ze,
      Ve,
      ae,
      Z,
      Te,
      qe,
      st,
      ot,
      ue,
      i = e.placement,
      r = void 0 === i ? n.placement : i,
      a = e.strategy,
      c = void 0 === a ? n.strategy : a,
      f = e.boundary,
      m = void 0 === f ? Ce : f,
      w = e.rootBoundary,
      x = void 0 === w ? xe : w,
      b = e.elementContext,
      N = void 0 === b ? me : b,
      k = e.altBoundary,
      P = void 0 !== k && k,
      D = e.padding,
      M = void 0 === D ? 0 : D,
      G = On("number" != typeof M ? M : Ti(M, R)),
      F = n.rects.popper,
      U = n.elements[P ? (N === me ? Pe : me) : N],
      H =
        ((Oe = ut(U) ? U : U.contextElement || Ge(n.elements.popper)),
        (Ve = x),
        (ae = c),
        (st =
          "clippingParents" === (ze = m)
            ? ((Te = Tn($t((Z = Oe)))),
              ut(
                (qe =
                  ["absolute", "fixed"].indexOf(Me(Z).position) >= 0 && ge(Z)
                    ? It(Z)
                    : Z)
              )
                ? Te.filter(function (xt) {
                    return ut(xt) && xn(xt, qe) && "body" !== Ee(xt);
                  })
                : [])
            : [].concat(ze)),
        (ue = (ot = [].concat(st, [Ve])).reduce(function (Z, Te) {
          var qe = Si(Oe, Te, ae);
          return (
            (Z.top = nt(qe.top, Z.top)),
            (Z.right = Mt(qe.right, Z.right)),
            (Z.bottom = Mt(qe.bottom, Z.bottom)),
            (Z.left = nt(qe.left, Z.left)),
            Z
          );
        }, Si(Oe, ot[0], ae))),
        (ue.width = ue.right - ue.left),
        (ue.height = ue.bottom - ue.top),
        (ue.x = ue.left),
        (ue.y = ue.top),
        ue),
      V = Qe(n.elements.reference),
      Y = ji({ reference: V, element: F, strategy: "absolute", placement: r }),
      J = ci(Object.assign({}, F, Y)),
      Q = N === me ? J : V,
      le = {
        top: H.top - Q.top + G.top,
        bottom: Q.bottom - H.bottom + G.bottom,
        left: H.left - Q.left + G.left,
        right: Q.right - H.right + G.right,
      },
      $e = n.modifiersData.offset;
    if (N === me && $e) {
      var Ze = $e[r];
      Object.keys(le).forEach(function (Oe) {
        var ze = [C, T].indexOf(Oe) >= 0 ? 1 : -1,
          Ve = [S, T].indexOf(Oe) >= 0 ? "y" : "x";
        le[Oe] += Ze[Ve] * ze;
      });
    }
    return le;
  }
  const Pi = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (n) {
      var e = n.state,
        t = n.options,
        i = n.name;
      if (!e.modifiersData[i]._skip) {
        for (
          var r = t.mainAxis,
            a = void 0 === r || r,
            c = t.altAxis,
            f = void 0 === c || c,
            m = t.fallbackPlacements,
            w = t.padding,
            x = t.boundary,
            b = t.rootBoundary,
            N = t.altBoundary,
            k = t.flipVariations,
            P = void 0 === k || k,
            D = t.allowedAutoPlacements,
            M = e.options.placement,
            G = Be(M),
            te =
              m ||
              (G !== M && P
                ? (function (Z) {
                    if (Be(Z) === q) return [];
                    var Te = Vn(Z);
                    return [Li(Z), Te, Li(Te)];
                  })(M)
                : [Vn(M)]),
            F = [M].concat(te).reduce(function (Z, Te) {
              return Z.concat(
                Be(Te) === q
                  ? (function Fs(n, e) {
                      void 0 === e && (e = {});
                      var r = e.boundary,
                        a = e.rootBoundary,
                        c = e.padding,
                        f = e.flipVariations,
                        m = e.allowedAutoPlacements,
                        w = void 0 === m ? We : m,
                        x = en(e.placement),
                        b = x
                          ? f
                            ? se
                            : se.filter(function (P) {
                                return en(P) === x;
                              })
                          : R,
                        N = b.filter(function (P) {
                          return w.indexOf(P) >= 0;
                        });
                      0 === N.length && (N = b);
                      var k = N.reduce(function (P, D) {
                        return (
                          (P[D] = tn(n, {
                            placement: D,
                            boundary: r,
                            rootBoundary: a,
                            padding: c,
                          })[Be(D)]),
                          P
                        );
                      }, {});
                      return Object.keys(k).sort(function (P, D) {
                        return k[P] - k[D];
                      });
                    })(e, {
                      placement: Te,
                      boundary: x,
                      rootBoundary: b,
                      padding: w,
                      flipVariations: P,
                      allowedAutoPlacements: D,
                    })
                  : Te
              );
            }, []),
            U = e.rects.reference,
            H = e.rects.popper,
            V = new Map(),
            Y = !0,
            J = F[0],
            Q = 0;
          Q < F.length;
          Q++
        ) {
          var le = F[Q],
            $e = Be(le),
            Ze = en(le) === K,
            Oe = [S, T].indexOf($e) >= 0,
            ze = Oe ? "width" : "height",
            Ve = tn(e, {
              placement: le,
              boundary: x,
              rootBoundary: b,
              altBoundary: N,
              padding: w,
            }),
            ae = Oe ? (Ze ? C : j) : Ze ? T : S;
          U[ze] > H[ze] && (ae = Vn(ae));
          var st = Vn(ae),
            ot = [];
          if (
            (a && ot.push(Ve[$e] <= 0),
            f && ot.push(Ve[ae] <= 0, Ve[st] <= 0),
            ot.every(function (Z) {
              return Z;
            }))
          ) {
            (J = le), (Y = !1);
            break;
          }
          V.set(le, ot);
        }
        if (Y)
          for (
            var on = function (Z) {
                var Te = F.find(function (qe) {
                  var xt = V.get(qe);
                  if (xt)
                    return xt.slice(0, Z).every(function (Zn) {
                      return Zn;
                    });
                });
                if (Te) return (J = Te), "break";
              },
              ue = P ? 3 : 1;
            ue > 0 && "break" !== on(ue);
            ue--
          );
        e.placement !== J &&
          ((e.modifiersData[i]._skip = !0), (e.placement = J), (e.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function Mi(n, e, t) {
    return (
      void 0 === t && (t = { x: 0, y: 0 }),
      {
        top: n.top - e.height - t.y,
        right: n.right - e.width + t.x,
        bottom: n.bottom - e.height + t.y,
        left: n.left - e.width - t.x,
      }
    );
  }
  function $i(n) {
    return [S, C, T, j].some(function (e) {
      return n[e] >= 0;
    });
  }
  const Ii = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (n) {
        var e = n.state,
          t = n.name,
          i = e.rects.reference,
          r = e.rects.popper,
          a = e.modifiersData.preventOverflow,
          c = tn(e, { elementContext: "reference" }),
          f = tn(e, { altBoundary: !0 }),
          m = Mi(c, i),
          w = Mi(f, r, a),
          x = $i(m),
          b = $i(w);
        (e.modifiersData[t] = {
          referenceClippingOffsets: m,
          popperEscapeOffsets: w,
          isReferenceHidden: x,
          hasPopperEscaped: b,
        }),
          (e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-reference-hidden": x,
            "data-popper-escaped": b,
          }));
      },
    },
    Ni = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (n) {
        var e = n.state,
          i = n.name,
          r = n.options.offset,
          a = void 0 === r ? [0, 0] : r,
          c = We.reduce(function (x, b) {
            return (
              (x[b] =
                ((k = e.rects),
                (P = a),
                (D = Be((N = b))),
                (M = [j, S].indexOf(D) >= 0 ? -1 : 1),
                (te =
                  (te = (G =
                    "function" == typeof P
                      ? P(Object.assign({}, k, { placement: N }))
                      : P)[0]) || 0),
                (F = ((F = G[1]) || 0) * M),
                [j, C].indexOf(D) >= 0 ? { x: F, y: te } : { x: te, y: F })),
              x
            );
            var N, k, P, D, M, G, te, F;
          }, {}),
          f = c[e.placement],
          w = f.y;
        null != e.modifiersData.popperOffsets &&
          ((e.modifiersData.popperOffsets.x += f.x),
          (e.modifiersData.popperOffsets.y += w)),
          (e.modifiersData[i] = c);
      },
    },
    ui = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (n) {
        var e = n.state;
        e.modifiersData[n.name] = ji({
          reference: e.rects.reference,
          element: e.rects.popper,
          strategy: "absolute",
          placement: e.placement,
        });
      },
      data: {},
    },
    Hi = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function (n) {
        var Oi,
          $s,
          e = n.state,
          t = n.options,
          i = n.name,
          r = t.mainAxis,
          a = void 0 === r || r,
          c = t.altAxis,
          f = void 0 !== c && c,
          N = t.tether,
          k = void 0 === N || N,
          P = t.tetherOffset,
          D = void 0 === P ? 0 : P,
          M = tn(e, {
            boundary: t.boundary,
            rootBoundary: t.rootBoundary,
            padding: t.padding,
            altBoundary: t.altBoundary,
          }),
          G = Be(e.placement),
          te = en(e.placement),
          F = !te,
          U = An(G),
          H = "x" === U ? "y" : "x",
          V = e.modifiersData.popperOffsets,
          Y = e.rects.reference,
          J = e.rects.popper,
          Q =
            "function" == typeof D
              ? D(Object.assign({}, e.rects, { placement: e.placement }))
              : D,
          le =
            "number" == typeof Q
              ? { mainAxis: Q, altAxis: Q }
              : Object.assign({ mainAxis: 0, altAxis: 0 }, Q),
          $e = e.modifiersData.offset
            ? e.modifiersData.offset[e.placement]
            : null,
          Ze = { x: 0, y: 0 };
        if (V) {
          if (a) {
            var Oe,
              ze = "y" === U ? S : j,
              Ve = "y" === U ? T : C,
              ae = "y" === U ? "height" : "width",
              st = V[U],
              ot = st + M[ze],
              on = st - M[Ve],
              ue = k ? -J[ae] / 2 : 0,
              Z = te === K ? Y[ae] : J[ae],
              Te = te === K ? -J[ae] : -Y[ae],
              qe = e.elements.arrow,
              xt = k && qe ? Zt(qe) : { width: 0, height: 0 },
              Zn = e.modifiersData["arrow#persistent"]
                ? e.modifiersData["arrow#persistent"].padding
                : { top: 0, right: 0, bottom: 0, left: 0 },
              As = Zn[ze],
              Os = Zn[Ve],
              ei = ft(0, Y[ae], xt[ae]),
              mr = F
                ? Y[ae] / 2 - ue - ei - As - le.mainAxis
                : Z - ei - As - le.mainAxis,
              gr = F
                ? -Y[ae] / 2 + ue + ei + Os + le.mainAxis
                : Te + ei + Os + le.mainAxis,
              Ei = e.elements.arrow && It(e.elements.arrow),
              _r = Ei
                ? "y" === U
                  ? Ei.clientTop || 0
                  : Ei.clientLeft || 0
                : 0,
              Ts = null != (Oe = $e?.[U]) ? Oe : 0,
              vr = st + gr - Ts,
              Cs = ft(
                k ? Mt(ot, st + mr - Ts - _r) : ot,
                st,
                k ? nt(on, vr) : on
              );
            (V[U] = Cs), (Ze[U] = Cs - st);
          }
          if (f) {
            var ks,
              Vt = V[H],
              ti = "y" === H ? "height" : "width",
              Ls = Vt + M["x" === U ? S : j],
              Ds = Vt - M["x" === U ? T : C],
              Ai = -1 !== [S, j].indexOf(G),
              Ss = null != (ks = $e?.[H]) ? ks : 0,
              js = Ai ? Ls : Vt - Y[ti] - J[ti] - Ss + le.altAxis,
              Ps = Ai ? Vt + Y[ti] + J[ti] - Ss - le.altAxis : Ds,
              Ms =
                k && Ai
                  ? ($s = ft(js, Vt, (Oi = Ps))) > Oi
                    ? Oi
                    : $s
                  : ft(k ? js : Ls, Vt, k ? Ps : Ds);
            (V[H] = Ms), (Ze[H] = Ms - Vt);
          }
          e.modifiersData[i] = Ze;
        }
      },
      requiresIfExists: ["offset"],
    };
  function Ws(n, e, t) {
    void 0 === t && (t = !1);
    var i,
      r,
      b,
      N,
      k,
      P,
      a = ge(e),
      c =
        ge(e) &&
        ((N = (b = e).getBoundingClientRect()),
        (k = yt(N.width) / b.offsetWidth || 1),
        (P = yt(N.height) / b.offsetHeight || 1),
        1 !== k || 1 !== P),
      f = Ge(e),
      m = Qe(n, c, t),
      w = { scrollLeft: 0, scrollTop: 0 },
      x = { x: 0, y: 0 };
    return (
      (a || (!a && !t)) &&
        (("body" !== Ee(e) || li(f)) &&
          (w =
            (i = e) !== Ae(i) && ge(i)
              ? { scrollLeft: (r = i).scrollLeft, scrollTop: r.scrollTop }
              : ri(i)),
        ge(e)
          ? (((x = Qe(e, !0)).x += e.clientLeft), (x.y += e.clientTop))
          : f && (x.x = ai(f))),
      {
        x: m.left + w.scrollLeft - x.x,
        y: m.top + w.scrollTop - x.y,
        width: m.width,
        height: m.height,
      }
    );
  }
  function Bs(n) {
    var e = new Map(),
      t = new Set(),
      i = [];
    function r(a) {
      t.add(a.name),
        []
          .concat(a.requires || [], a.requiresIfExists || [])
          .forEach(function (c) {
            if (!t.has(c)) {
              var f = e.get(c);
              f && r(f);
            }
          }),
        i.push(a);
    }
    return (
      n.forEach(function (a) {
        e.set(a.name, a);
      }),
      n.forEach(function (a) {
        t.has(a.name) || r(a);
      }),
      i
    );
  }
  var Fi = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Wi() {
    for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
      e[t] = arguments[t];
    return !e.some(function (i) {
      return !(i && "function" == typeof i.getBoundingClientRect);
    });
  }
  function qn(n) {
    void 0 === n && (n = {});
    var t = n.defaultModifiers,
      i = void 0 === t ? [] : t,
      r = n.defaultOptions,
      a = void 0 === r ? Fi : r;
    return function (c, f, m) {
      void 0 === m && (m = a);
      var w,
        x,
        b = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, Fi, a),
          modifiersData: {},
          elements: { reference: c, popper: f },
          attributes: {},
          styles: {},
        },
        N = [],
        k = !1,
        P = {
          state: b,
          setOptions: function (M) {
            var G = "function" == typeof M ? M(b.options) : M;
            D(),
              (b.options = Object.assign({}, a, b.options, G)),
              (b.scrollParents = {
                reference: ut(c)
                  ? Tn(c)
                  : c.contextElement
                  ? Tn(c.contextElement)
                  : [],
                popper: Tn(f),
              });
            var te,
              F,
              H,
              V,
              U =
                ((te = [].concat(i, b.options.modifiers)),
                (F = te.reduce(function (H, V) {
                  var Y = H[V.name];
                  return (
                    (H[V.name] = Y
                      ? Object.assign({}, Y, V, {
                          options: Object.assign({}, Y.options, V.options),
                          data: Object.assign({}, Y.data, V.data),
                        })
                      : V),
                    H
                  );
                }, {})),
                (H = Object.keys(F).map(function (H) {
                  return F[H];
                })),
                (V = Bs(H)),
                bn.reduce(function (Y, J) {
                  return Y.concat(
                    V.filter(function (Q) {
                      return Q.phase === J;
                    })
                  );
                }, []));
            return (
              (b.orderedModifiers = U.filter(function (H) {
                return H.enabled;
              })),
              b.orderedModifiers.forEach(function (H) {
                var Y = H.options,
                  Q = H.effect;
                if ("function" == typeof Q) {
                  var le = Q({
                    state: b,
                    name: H.name,
                    instance: P,
                    options: void 0 === Y ? {} : Y,
                  });
                  N.push(le || function () {});
                }
              }),
              P.update()
            );
          },
          forceUpdate: function () {
            if (!k) {
              var M = b.elements,
                G = M.reference,
                te = M.popper;
              if (Wi(G, te)) {
                (b.rects = {
                  reference: Ws(G, It(te), "fixed" === b.options.strategy),
                  popper: Zt(te),
                }),
                  (b.reset = !1),
                  (b.placement = b.options.placement),
                  b.orderedModifiers.forEach(function (Q) {
                    return (b.modifiersData[Q.name] = Object.assign(
                      {},
                      Q.data
                    ));
                  });
                for (var F = 0; F < b.orderedModifiers.length; F++)
                  if (!0 !== b.reset) {
                    var U = b.orderedModifiers[F],
                      H = U.fn,
                      V = U.options;
                    "function" == typeof H &&
                      (b =
                        H({
                          state: b,
                          options: void 0 === V ? {} : V,
                          name: U.name,
                          instance: P,
                        }) || b);
                  } else (b.reset = !1), (F = -1);
              }
            }
          },
          update:
            ((w = function () {
              return new Promise(function (M) {
                P.forceUpdate(), M(b);
              });
            }),
            function () {
              return (
                x ||
                  (x = new Promise(function (M) {
                    Promise.resolve().then(function () {
                      (x = void 0), M(w());
                    });
                  })),
                x
              );
            }),
          destroy: function () {
            D(), (k = !0);
          },
        };
      if (!Wi(c, f)) return P;
      function D() {
        N.forEach(function (M) {
          return M();
        }),
          (N = []);
      }
      return (
        P.setOptions(m).then(function (M) {
          !k && m.onFirstUpdate && m.onFirstUpdate(M);
        }),
        P
      );
    };
  }
  var Rs = qn(),
    zs = qn({ defaultModifiers: [oi, ui, si, Jt] }),
    fi = qn({ defaultModifiers: [oi, ui, si, Jt, Ni, Pi, Hi, Ci, Ii] });
  const Bi = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          afterMain: St,
          afterRead: ct,
          afterWrite: vn,
          applyStyles: Jt,
          arrow: Ci,
          auto: q,
          basePlacements: R,
          beforeMain: ke,
          beforeRead: tt,
          beforeWrite: jt,
          bottom: T,
          clippingParents: Ce,
          computeStyles: si,
          createPopper: fi,
          createPopperBase: Rs,
          createPopperLite: zs,
          detectOverflow: tn,
          end: re,
          eventListeners: oi,
          flip: Pi,
          hide: Ii,
          left: j,
          main: "main",
          modifierPhases: bn,
          offset: Ni,
          placements: We,
          popper: me,
          popperGenerator: qn,
          popperOffsets: ui,
          preventOverflow: Hi,
          read: "read",
          reference: Pe,
          right: C,
          start: K,
          top: S,
          variationPlacements: se,
          viewport: xe,
          write: "write",
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    Ri = "dropdown",
    Nt = ".bs.dropdown",
    di = ".data-api",
    Vs = "ArrowUp",
    zi = "ArrowDown",
    qs = `hide${Nt}`,
    Us = `hidden${Nt}`,
    Xs = `show${Nt}`,
    Ks = `shown${Nt}`,
    Vi = `click${Nt}${di}`,
    qi = `keydown${Nt}${di}`,
    Ys = `keyup${Nt}${di}`,
    nn = "show",
    Ht = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Qs = `${Ht}.${nn}`,
    Un = ".dropdown-menu",
    Gs = he() ? "top-end" : "top-start",
    Js = he() ? "top-start" : "top-end",
    Zs = he() ? "bottom-end" : "bottom-start",
    eo = he() ? "bottom-start" : "bottom-end",
    to = he() ? "left-start" : "right-start",
    no = he() ? "right-start" : "left-start",
    io = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle",
    },
    so = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)",
    };
  class Je extends ye {
    constructor(e, t) {
      super(e, t),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          O.next(this._element, Un)[0] ||
          O.prev(this._element, Un)[0] ||
          O.findOne(Un, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return io;
    }
    static get DefaultType() {
      return so;
    }
    static get NAME() {
      return Ri;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (Ie(this._element) || this._isShown()) return;
      const e = { relatedTarget: this._element };
      if (!h.trigger(this._element, Xs, e).defaultPrevented) {
        if (
          (this._createPopper(),
          "ontouchstart" in document.documentElement &&
            !this._parent.closest(".navbar-nav"))
        )
          for (const t of [].concat(...document.body.children))
            h.on(t, "mouseover", Xe);
        this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.add(nn),
          this._element.classList.add(nn),
          h.trigger(this._element, Ks, e);
      }
    }
    hide() {
      !Ie(this._element) &&
        this._isShown() &&
        this._completeHide({ relatedTarget: this._element });
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(e) {
      if (!h.trigger(this._element, qs, e).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const t of [].concat(...document.body.children))
            h.off(t, "mouseover", Xe);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(nn),
          this._element.classList.remove(nn),
          this._element.setAttribute("aria-expanded", "false"),
          Ke.removeDataAttribute(this._menu, "popper"),
          h.trigger(this._element, Us, e);
      }
    }
    _getConfig(e) {
      if (
        "object" == typeof (e = super._getConfig(e)).reference &&
        !fe(e.reference) &&
        "function" != typeof e.reference.getBoundingClientRect
      )
        throw new TypeError(
          `${Ri.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
        );
      return e;
    }
    _createPopper() {
      if (void 0 === Bi)
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)"
        );
      let e = this._element;
      "parent" === this._config.reference
        ? (e = this._parent)
        : fe(this._config.reference)
        ? (e = De(this._config.reference))
        : "object" == typeof this._config.reference &&
          (e = this._config.reference);
      const t = this._getPopperConfig();
      this._popper = fi(e, this._menu, t);
    }
    _isShown() {
      return this._menu.classList.contains(nn);
    }
    _getPlacement() {
      const e = this._parent;
      if (e.classList.contains("dropend")) return to;
      if (e.classList.contains("dropstart")) return no;
      if (e.classList.contains("dropup-center")) return "top";
      if (e.classList.contains("dropdown-center")) return "bottom";
      const t =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return e.classList.contains("dropup") ? (t ? Js : Gs) : t ? eo : Zs;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: e } = this._config;
      return "string" == typeof e
        ? e.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof e
        ? (t) => e(t, this._element)
        : e;
    }
    _getPopperConfig() {
      const e = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || "static" === this._config.display) &&
          (Ke.setDataAttribute(this._menu, "popper", "static"),
          (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
        { ...e, ...ce(this._config.popperConfig, [e]) }
      );
    }
    _selectMenuItem({ key: e, target: t }) {
      const i = O.find(
        ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        this._menu
      ).filter((r) => Se(r));
      i.length && Et(i, t, e === zi, !i.includes(t)).focus();
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Je.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
    static clearMenus(e) {
      if (2 === e.button || ("keyup" === e.type && "Tab" !== e.key)) return;
      const t = O.find(Qs);
      for (const i of t) {
        const r = Je.getInstance(i);
        if (!r || !1 === r._config.autoClose) continue;
        const a = e.composedPath(),
          c = a.includes(r._menu);
        if (
          a.includes(r._element) ||
          ("inside" === r._config.autoClose && !c) ||
          ("outside" === r._config.autoClose && c) ||
          (r._menu.contains(e.target) &&
            (("keyup" === e.type && "Tab" === e.key) ||
              /input|select|option|textarea|form/i.test(e.target.tagName)))
        )
          continue;
        const f = { relatedTarget: r._element };
        "click" === e.type && (f.clickEvent = e), r._completeHide(f);
      }
    }
    static dataApiKeydownHandler(e) {
      const t = /input|textarea/i.test(e.target.tagName),
        i = "Escape" === e.key,
        r = [Vs, zi].includes(e.key);
      if ((!r && !i) || (t && !i)) return;
      e.preventDefault();
      const a = this.matches(Ht)
          ? this
          : O.prev(this, Ht)[0] ||
            O.next(this, Ht)[0] ||
            O.findOne(Ht, e.delegateTarget.parentNode),
        c = Je.getOrCreateInstance(a);
      if (r) return e.stopPropagation(), c.show(), void c._selectMenuItem(e);
      c._isShown() && (e.stopPropagation(), c.hide(), a.focus());
    }
  }
  h.on(document, qi, Ht, Je.dataApiKeydownHandler),
    h.on(document, qi, Un, Je.dataApiKeydownHandler),
    h.on(document, Vi, Je.clearMenus),
    h.on(document, Ys, Je.clearMenus),
    h.on(document, Vi, Ht, function (n) {
      n.preventDefault(), Je.getOrCreateInstance(this).toggle();
    }),
    oe(Je);
  const Ui = "backdrop",
    Ki = `mousedown.bs.${Ui}`,
    oo = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body",
    },
    ro = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)",
    };
  class Yi extends gt {
    constructor(e) {
      super(),
        (this._config = this._getConfig(e)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return oo;
    }
    static get DefaultType() {
      return ro;
    }
    static get NAME() {
      return Ui;
    }
    show(e) {
      if (!this._config.isVisible) return void ce(e);
      this._append();
      this._getElement().classList.add("show"),
        this._emulateAnimation(() => {
          ce(e);
        });
    }
    hide(e) {
      this._config.isVisible
        ? (this._getElement().classList.remove("show"),
          this._emulateAnimation(() => {
            this.dispose(), ce(e);
          }))
        : ce(e);
    }
    dispose() {
      this._isAppended &&
        (h.off(this._element, Ki),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const e = document.createElement("div");
        (e.className = this._config.className),
          this._config.isAnimated && e.classList.add("fade"),
          (this._element = e);
      }
      return this._element;
    }
    _configAfterMerge(e) {
      return (e.rootElement = De(e.rootElement)), e;
    }
    _append() {
      if (this._isAppended) return;
      const e = this._getElement();
      this._config.rootElement.append(e),
        h.on(e, Ki, () => {
          ce(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(e) {
      Dn(e, this._getElement(), this._config.isAnimated);
    }
  }
  const Xn = ".bs.focustrap",
    ao = `focusin${Xn}`,
    lo = `keydown.tab${Xn}`,
    Qi = "backward",
    co = { autofocus: !0, trapElement: null },
    uo = { autofocus: "boolean", trapElement: "element" };
  class Gi extends gt {
    constructor(e) {
      super(),
        (this._config = this._getConfig(e)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return co;
    }
    static get DefaultType() {
      return uo;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        h.off(document, Xn),
        h.on(document, ao, (e) => this._handleFocusin(e)),
        h.on(document, lo, (e) => this._handleKeydown(e)),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), h.off(document, Xn));
    }
    _handleFocusin(e) {
      const { trapElement: t } = this._config;
      if (e.target === document || e.target === t || t.contains(e.target))
        return;
      const i = O.focusableChildren(t);
      0 === i.length
        ? t.focus()
        : this._lastTabNavDirection === Qi
        ? i[i.length - 1].focus()
        : i[0].focus();
    }
    _handleKeydown(e) {
      "Tab" === e.key &&
        (this._lastTabNavDirection = e.shiftKey ? Qi : "forward");
    }
  }
  const Ji = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Zi = ".sticky-top",
    Kn = "padding-right",
    es = "margin-right";
  class hi {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const e = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - e);
    }
    hide() {
      const e = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, Kn, (t) => t + e),
        this._setElementAttributes(Ji, Kn, (t) => t + e),
        this._setElementAttributes(Zi, es, (t) => t - e);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, Kn),
        this._resetElementAttributes(Ji, Kn),
        this._resetElementAttributes(Zi, es);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(e, t, i) {
      const r = this.getWidth();
      this._applyManipulationCallback(e, (a) => {
        if (a !== this._element && window.innerWidth > a.clientWidth + r)
          return;
        this._saveInitialAttribute(a, t);
        const c = window.getComputedStyle(a).getPropertyValue(t);
        a.style.setProperty(t, `${i(Number.parseFloat(c))}px`);
      });
    }
    _saveInitialAttribute(e, t) {
      const i = e.style.getPropertyValue(t);
      i && Ke.setDataAttribute(e, t, i);
    }
    _resetElementAttributes(e, t) {
      this._applyManipulationCallback(e, (i) => {
        const r = Ke.getDataAttribute(i, t);
        null !== r
          ? (Ke.removeDataAttribute(i, t), i.style.setProperty(t, r))
          : i.style.removeProperty(t);
      });
    }
    _applyManipulationCallback(e, t) {
      if (fe(e)) t(e);
      else for (const i of O.find(e, this._element)) t(i);
    }
  }
  const Re = ".bs.modal",
    fo = `hide${Re}`,
    ho = `hidePrevented${Re}`,
    ts = `hidden${Re}`,
    ns = `show${Re}`,
    po = `shown${Re}`,
    mo = `resize${Re}`,
    go = `click.dismiss${Re}`,
    _o = `mousedown.dismiss${Re}`,
    vo = `keydown.dismiss${Re}`,
    bo = `click${Re}.data-api`,
    is = "modal-open",
    pi = "modal-static",
    yo = { backdrop: !0, focus: !0, keyboard: !0 },
    wo = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean",
    };
  class Ft extends ye {
    constructor(e, t) {
      super(e, t),
        (this._dialog = O.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new hi()),
        this._addEventListeners();
    }
    static get Default() {
      return yo;
    }
    static get DefaultType() {
      return wo;
    }
    static get NAME() {
      return "modal";
    }
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e);
    }
    show(e) {
      this._isShown ||
        this._isTransitioning ||
        h.trigger(this._element, ns, { relatedTarget: e }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(is),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(e)));
    }
    hide() {
      this._isShown &&
        !this._isTransitioning &&
        (h.trigger(this._element, fo).defaultPrevented ||
          ((this._isShown = !1),
          (this._isTransitioning = !0),
          this._focustrap.deactivate(),
          this._element.classList.remove("show"),
          this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated()
          )));
    }
    dispose() {
      h.off(window, Re),
        h.off(this._dialog, Re),
        this._backdrop.dispose(),
        this._focustrap.deactivate(),
        super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Yi({
        isVisible: !!this._config.backdrop,
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new Gi({ trapElement: this._element });
    }
    _showElement(e) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0);
      const t = O.findOne(".modal-body", this._dialog);
      t && (t.scrollTop = 0),
        this._element.classList.add("show"),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              h.trigger(this._element, po, { relatedTarget: e });
          },
          this._dialog,
          this._isAnimated()
        );
    }
    _addEventListeners() {
      h.on(this._element, vo, (e) => {
        "Escape" === e.key &&
          (this._config.keyboard
            ? this.hide()
            : this._triggerBackdropTransition());
      }),
        h.on(window, mo, () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        h.on(this._element, _o, (e) => {
          h.one(this._element, go, (t) => {
            this._element === e.target &&
              this._element === t.target &&
              ("static" !== this._config.backdrop
                ? this._config.backdrop && this.hide()
                : this._triggerBackdropTransition());
          });
        });
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(is),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            h.trigger(this._element, ts);
        });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (h.trigger(this._element, ho).defaultPrevented) return;
      const e =
          this._element.scrollHeight > document.documentElement.clientHeight,
        t = this._element.style.overflowY;
      "hidden" === t ||
        this._element.classList.contains(pi) ||
        (e || (this._element.style.overflowY = "hidden"),
        this._element.classList.add(pi),
        this._queueCallback(() => {
          this._element.classList.remove(pi),
            this._queueCallback(() => {
              this._element.style.overflowY = t;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const e =
          this._element.scrollHeight > document.documentElement.clientHeight,
        t = this._scrollBar.getWidth(),
        i = t > 0;
      if (i && !e) {
        const r = he() ? "paddingLeft" : "paddingRight";
        this._element.style[r] = `${t}px`;
      }
      if (!i && e) {
        const r = he() ? "paddingRight" : "paddingLeft";
        this._element.style[r] = `${t}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(e, t) {
      return this.each(function () {
        const i = Ft.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
          i[e](t);
        }
      });
    }
  }
  h.on(document, bo, '[data-bs-toggle="modal"]', function (n) {
    const e = O.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
      h.one(e, ns, (i) => {
        i.defaultPrevented ||
          h.one(e, ts, () => {
            Se(this) && this.focus();
          });
      });
    const t = O.findOne(".modal.show");
    t && Ft.getInstance(t).hide(), Ft.getOrCreateInstance(e).toggle(this);
  }),
    we(Ft),
    oe(Ft);
  const dt = ".bs.offcanvas",
    os = ".data-api",
    xo = `load${dt}${os}`,
    as = "showing",
    cs = ".offcanvas.show",
    Eo = `show${dt}`,
    Ao = `shown${dt}`,
    Oo = `hide${dt}`,
    us = `hidePrevented${dt}`,
    fs = `hidden${dt}`,
    To = `resize${dt}`,
    Co = `click${dt}${os}`,
    ko = `keydown.dismiss${dt}`,
    Lo = { backdrop: !0, keyboard: !0, scroll: !1 },
    Do = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean",
    };
  class ht extends ye {
    constructor(e, t) {
      super(e, t),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return Lo;
    }
    static get DefaultType() {
      return Do;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e);
    }
    show(e) {
      this._isShown ||
        h.trigger(this._element, Eo, { relatedTarget: e }).defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new hi().hide(),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add(as),
        this._queueCallback(
          () => {
            (this._config.scroll && !this._config.backdrop) ||
              this._focustrap.activate(),
              this._element.classList.add("show"),
              this._element.classList.remove(as),
              h.trigger(this._element, Ao, { relatedTarget: e });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        (h.trigger(this._element, Oo).defaultPrevented ||
          (this._focustrap.deactivate(),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.add("hiding"),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.classList.remove("show", "hiding"),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._config.scroll || new hi().reset(),
                h.trigger(this._element, fs);
            },
            this._element,
            !0
          )));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const e = !!this._config.backdrop;
      return new Yi({
        className: "offcanvas-backdrop",
        isVisible: e,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: e
          ? () => {
              "static" !== this._config.backdrop
                ? this.hide()
                : h.trigger(this._element, us);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new Gi({ trapElement: this._element });
    }
    _addEventListeners() {
      h.on(this._element, ko, (e) => {
        "Escape" === e.key &&
          (this._config.keyboard ? this.hide() : h.trigger(this._element, us));
      });
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = ht.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e](this);
        }
      });
    }
  }
  h.on(document, Co, '[data-bs-toggle="offcanvas"]', function (n) {
    const e = O.getElementFromSelector(this);
    if ((["A", "AREA"].includes(this.tagName) && n.preventDefault(), Ie(this)))
      return;
    h.one(e, fs, () => {
      Se(this) && this.focus();
    });
    const t = O.findOne(cs);
    t && t !== e && ht.getInstance(t).hide(),
      ht.getOrCreateInstance(e).toggle(this);
  }),
    h.on(window, xo, () => {
      for (const n of O.find(cs)) ht.getOrCreateInstance(n).show();
    }),
    h.on(window, To, () => {
      for (const n of O.find("[aria-modal][class*=show][class*=offcanvas-]"))
        "fixed" !== getComputedStyle(n).position &&
          ht.getOrCreateInstance(n).hide();
    }),
    we(ht),
    oe(ht);
  const ds = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    So = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    jo = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    Po = (n, e) => {
      const t = n.nodeName.toLowerCase();
      return e.includes(t)
        ? !So.has(t) || !!jo.test(n.nodeValue)
        : e.filter((i) => i instanceof RegExp).some((i) => i.test(t));
    },
    Mo = {
      allowList: ds,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>",
    },
    $o = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string",
    },
    Io = {
      entry: "(string|element|function|null)",
      selector: "(string|element)",
    };
  class No extends gt {
    constructor(e) {
      super(), (this._config = this._getConfig(e));
    }
    static get Default() {
      return Mo;
    }
    static get DefaultType() {
      return $o;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content)
        .map((e) => this._resolvePossibleFunction(e))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(e) {
      return (
        this._checkContent(e),
        (this._config.content = { ...this._config.content, ...e }),
        this
      );
    }
    toHtml() {
      const e = document.createElement("div");
      e.innerHTML = this._maybeSanitize(this._config.template);
      for (const [r, a] of Object.entries(this._config.content))
        this._setContent(e, a, r);
      const t = e.children[0],
        i = this._resolvePossibleFunction(this._config.extraClass);
      return i && t.classList.add(...i.split(" ")), t;
    }
    _typeCheckConfig(e) {
      super._typeCheckConfig(e), this._checkContent(e.content);
    }
    _checkContent(e) {
      for (const [t, i] of Object.entries(e))
        super._typeCheckConfig({ selector: t, entry: i }, Io);
    }
    _setContent(e, t, i) {
      const r = O.findOne(i, e);
      r &&
        ((t = this._resolvePossibleFunction(t))
          ? fe(t)
            ? this._putElementInTemplate(De(t), r)
            : this._config.html
            ? (r.innerHTML = this._maybeSanitize(t))
            : (r.textContent = t)
          : r.remove());
    }
    _maybeSanitize(e) {
      return this._config.sanitize
        ? (function (t, i, r) {
            if (!t.length) return t;
            if (r && "function" == typeof r) return r(t);
            const a = new window.DOMParser().parseFromString(t, "text/html"),
              c = [].concat(...a.body.querySelectorAll("*"));
            for (const f of c) {
              const m = f.nodeName.toLowerCase();
              if (!Object.keys(i).includes(m)) {
                f.remove();
                continue;
              }
              const w = [].concat(...f.attributes),
                x = [].concat(i["*"] || [], i[m] || []);
              for (const b of w) Po(b, x) || f.removeAttribute(b.nodeName);
            }
            return a.body.innerHTML;
          })(e, this._config.allowList, this._config.sanitizeFn)
        : e;
    }
    _resolvePossibleFunction(e) {
      return ce(e, [this]);
    }
    _putElementInTemplate(e, t) {
      if (this._config.html) return (t.innerHTML = ""), void t.append(e);
      t.textContent = e.textContent;
    }
  }
  const Ho = new Set(["sanitize", "allowList", "sanitizeFn"]),
    mi = "fade",
    Yn = "show",
    ps = "hide.bs.modal",
    Cn = "hover",
    gi = "focus",
    Fo = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: he() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: he() ? "right" : "left",
    },
    Wo = {
      allowList: ds,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 6],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus",
    },
    Bo = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
    };
  class Wt extends ye {
    constructor(e, t) {
      if (void 0 === Bi)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(e, t),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return Wo;
    }
    static get DefaultType() {
      return Bo;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled &&
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout),
        h.off(this._element.closest(".modal"), ps, this._hideModalHandler),
        this._element.getAttribute("data-bs-original-title") &&
          this._element.setAttribute(
            "title",
            this._element.getAttribute("data-bs-original-title")
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const e = h.trigger(this._element, this.constructor.eventName("show")),
        t = (
          rn(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (e.defaultPrevented || !t) return;
      this._disposePopper();
      const i = this._getTipElement();
      this._element.setAttribute("aria-describedby", i.getAttribute("id"));
      const { container: r } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (r.append(i),
          h.trigger(this._element, this.constructor.eventName("inserted"))),
        (this._popper = this._createPopper(i)),
        i.classList.add(Yn),
        "ontouchstart" in document.documentElement)
      )
        for (const a of [].concat(...document.body.children))
          h.on(a, "mouseover", Xe);
      this._queueCallback(
        () => {
          h.trigger(this._element, this.constructor.eventName("shown")),
            !1 === this._isHovered && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated()
      );
    }
    hide() {
      if (
        this._isShown() &&
        !h.trigger(this._element, this.constructor.eventName("hide"))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(Yn),
          "ontouchstart" in document.documentElement)
        )
          for (const e of [].concat(...document.body.children))
            h.off(e, "mouseover", Xe);
        (this._activeTrigger.click = !1),
          (this._activeTrigger[gi] = !1),
          (this._activeTrigger[Cn] = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute("aria-describedby"),
                h.trigger(this._element, this.constructor.eventName("hidden")));
            },
            this.tip,
            this._isAnimated()
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return !!this._getTitle();
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
        this.tip
      );
    }
    _createTipElement(e) {
      const t = this._getTemplateFactory(e).toHtml();
      if (!t) return null;
      t.classList.remove(mi, Yn),
        t.classList.add(`bs-${this.constructor.NAME}-auto`);
      const i = ((r) => {
        do {
          r += Math.floor(1e6 * Math.random());
        } while (document.getElementById(r));
        return r;
      })(this.constructor.NAME).toString();
      return (
        t.setAttribute("id", i), this._isAnimated() && t.classList.add(mi), t
      );
    }
    setContent(e) {
      (this._newContent = e),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(e) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(e)
          : (this._templateFactory = new No({
              ...this._config,
              content: e,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute("data-bs-original-title")
      );
    }
    _initializeOnDelegatedTarget(e) {
      return this.constructor.getOrCreateInstance(
        e.delegateTarget,
        this._getDelegateConfig()
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(mi))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(Yn);
    }
    _createPopper(e) {
      const t = ce(this._config.placement, [this, e, this._element]),
        i = Fo[t.toUpperCase()];
      return fi(this._element, e, this._getPopperConfig(i));
    }
    _getOffset() {
      const { offset: e } = this._config;
      return "string" == typeof e
        ? e.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof e
        ? (t) => e(t, this._element)
        : e;
    }
    _resolvePossibleFunction(e) {
      return ce(e, [this._element]);
    }
    _getPopperConfig(e) {
      const t = {
        placement: e,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "preSetPlacement",
            enabled: !0,
            phase: "beforeMain",
            fn: (i) => {
              this._getTipElement().setAttribute(
                "data-popper-placement",
                i.state.placement
              );
            },
          },
        ],
      };
      return { ...t, ...ce(this._config.popperConfig, [t]) };
    }
    _setListeners() {
      const e = this._config.trigger.split(" ");
      for (const t of e)
        if ("click" === t)
          h.on(
            this._element,
            this.constructor.eventName("click"),
            this._config.selector,
            (i) => {
              this._initializeOnDelegatedTarget(i).toggle();
            }
          );
        else if ("manual" !== t) {
          const i = this.constructor.eventName(
              t === Cn ? "mouseenter" : "focusin"
            ),
            r = this.constructor.eventName(
              t === Cn ? "mouseleave" : "focusout"
            );
          h.on(this._element, i, this._config.selector, (a) => {
            const c = this._initializeOnDelegatedTarget(a);
            (c._activeTrigger["focusin" === a.type ? gi : Cn] = !0), c._enter();
          }),
            h.on(this._element, r, this._config.selector, (a) => {
              const c = this._initializeOnDelegatedTarget(a);
              (c._activeTrigger["focusout" === a.type ? gi : Cn] =
                c._element.contains(a.relatedTarget)),
                c._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        h.on(this._element.closest(".modal"), ps, this._hideModalHandler);
    }
    _fixTitle() {
      const e = this._element.getAttribute("title");
      e &&
        (this._element.getAttribute("aria-label") ||
          this._element.textContent.trim() ||
          this._element.setAttribute("aria-label", e),
        this._element.setAttribute("data-bs-original-title", e),
        this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(e, t) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(e) {
      const t = Ke.getDataAttributes(this._element);
      for (const i of Object.keys(t)) Ho.has(i) && delete t[i];
      return (
        (e = { ...t, ...("object" == typeof e && e ? e : {}) }),
        (e = this._mergeConfigObj(e)),
        (e = this._configAfterMerge(e)),
        this._typeCheckConfig(e),
        e
      );
    }
    _configAfterMerge(e) {
      return (
        (e.container = !1 === e.container ? document.body : De(e.container)),
        "number" == typeof e.delay &&
          (e.delay = { show: e.delay, hide: e.delay }),
        "number" == typeof e.title && (e.title = e.title.toString()),
        "number" == typeof e.content && (e.content = e.content.toString()),
        e
      );
    }
    _getDelegateConfig() {
      const e = {};
      for (const [t, i] of Object.entries(this._config))
        this.constructor.Default[t] !== i && (e[t] = i);
      return (e.selector = !1), (e.trigger = "manual"), e;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Wt.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  oe(Wt);
  const Ro = {
      ...Wt.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click",
    },
    zo = { ...Wt.DefaultType, content: "(null|string|element|function)" };
  class Qn extends Wt {
    static get Default() {
      return Ro;
    }
    static get DefaultType() {
      return zo;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Qn.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  oe(Qn);
  const _i = ".bs.scrollspy",
    Vo = `activate${_i}`,
    ms = `click${_i}`,
    qo = `load${_i}.data-api`,
    sn = "active",
    vi = "[href]",
    gs = ".nav-link",
    Uo = `${gs}, .nav-item > ${gs}, .list-group-item`,
    Xo = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    Ko = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array",
    };
  class kn extends ye {
    constructor(e, t) {
      super(e, t),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          "visible" === getComputedStyle(this._element).overflowY
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return Xo;
    }
    static get DefaultType() {
      return Ko;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const e of this._observableSections.values())
        this._observer.observe(e);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(e) {
      return (
        (e.target = De(e.target) || document.body),
        (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
        "string" == typeof e.threshold &&
          (e.threshold = e.threshold
            .split(",")
            .map((t) => Number.parseFloat(t))),
        e
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        (h.off(this._config.target, ms),
        h.on(this._config.target, ms, vi, (e) => {
          const t = this._observableSections.get(e.target.hash);
          if (t) {
            e.preventDefault();
            const i = this._rootElement || window,
              r = t.offsetTop - this._element.offsetTop;
            if (i.scrollTo)
              return void i.scrollTo({ top: r, behavior: "smooth" });
            i.scrollTop = r;
          }
        }));
    }
    _getNewObserver() {
      return new IntersectionObserver((t) => this._observerCallback(t), {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      });
    }
    _observerCallback(e) {
      const t = (c) => this._targetLinks.get(`#${c.target.id}`),
        i = (c) => {
          (this._previousScrollData.visibleEntryTop = c.target.offsetTop),
            this._process(t(c));
        },
        r = (this._rootElement || document.documentElement).scrollTop,
        a = r >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = r;
      for (const c of e) {
        if (!c.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(t(c));
          continue;
        }
        const f =
          c.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (a && f) {
          if ((i(c), !r)) return;
        } else a || f || i(c);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const e = O.find(vi, this._config.target);
      for (const t of e) {
        if (!t.hash || Ie(t)) continue;
        const i = O.findOne(decodeURI(t.hash), this._element);
        Se(i) &&
          (this._targetLinks.set(decodeURI(t.hash), t),
          this._observableSections.set(t.hash, i));
      }
    }
    _process(e) {
      this._activeTarget !== e &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = e),
        e.classList.add(sn),
        this._activateParents(e),
        h.trigger(this._element, Vo, { relatedTarget: e }));
    }
    _activateParents(e) {
      if (e.classList.contains("dropdown-item"))
        O.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(sn);
      else
        for (const t of O.parents(e, ".nav, .list-group"))
          for (const i of O.prev(t, Uo)) i.classList.add(sn);
    }
    _clearActiveClass(e) {
      e.classList.remove(sn);
      const t = O.find(`${vi}.${sn}`, e);
      for (const i of t) i.classList.remove(sn);
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = kn.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  h.on(window, qo, () => {
    for (const n of O.find('[data-bs-spy="scroll"]')) kn.getOrCreateInstance(n);
  }),
    oe(kn);
  const Bt = ".bs.tab",
    Yo = `hide${Bt}`,
    Qo = `hidden${Bt}`,
    Go = `show${Bt}`,
    Jo = `shown${Bt}`,
    Zo = `click${Bt}`,
    er = `keydown${Bt}`,
    tr = `load${Bt}`,
    nr = "ArrowLeft",
    _s = "ArrowRight",
    ir = "ArrowUp",
    vs = "ArrowDown",
    bi = "Home",
    bs = "End",
    Rt = "active",
    yi = "show",
    ws = ".dropdown-toggle",
    wi = `:not(${ws})`,
    xs =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    xi = `.nav-link${wi}, .list-group-item${wi}, [role="tab"]${wi}, ${xs}`,
    sr = `.${Rt}[data-bs-toggle="tab"], .${Rt}[data-bs-toggle="pill"], .${Rt}[data-bs-toggle="list"]`;
  class zt extends ye {
    constructor(e) {
      super(e),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]'
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          h.on(this._element, er, (t) => this._keydown(t)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const e = this._element;
      if (this._elemIsActive(e)) return;
      const t = this._getActiveElem(),
        i = t ? h.trigger(t, Yo, { relatedTarget: e }) : null;
      h.trigger(e, Go, { relatedTarget: t }).defaultPrevented ||
        (i && i.defaultPrevented) ||
        (this._deactivate(t, e), this._activate(e, t));
    }
    _activate(e, t) {
      e &&
        (e.classList.add(Rt),
        this._activate(O.getElementFromSelector(e)),
        this._queueCallback(
          () => {
            "tab" === e.getAttribute("role")
              ? (e.removeAttribute("tabindex"),
                e.setAttribute("aria-selected", !0),
                this._toggleDropDown(e, !0),
                h.trigger(e, Jo, { relatedTarget: t }))
              : e.classList.add(yi);
          },
          e,
          e.classList.contains("fade")
        ));
    }
    _deactivate(e, t) {
      e &&
        (e.classList.remove(Rt),
        e.blur(),
        this._deactivate(O.getElementFromSelector(e)),
        this._queueCallback(
          () => {
            "tab" === e.getAttribute("role")
              ? (e.setAttribute("aria-selected", !1),
                e.setAttribute("tabindex", "-1"),
                this._toggleDropDown(e, !1),
                h.trigger(e, Qo, { relatedTarget: t }))
              : e.classList.remove(yi);
          },
          e,
          e.classList.contains("fade")
        ));
    }
    _keydown(e) {
      if (![nr, _s, ir, vs, bi, bs].includes(e.key)) return;
      e.stopPropagation(), e.preventDefault();
      const t = this._getChildren().filter((r) => !Ie(r));
      let i;
      if ([bi, bs].includes(e.key)) i = t[e.key === bi ? 0 : t.length - 1];
      else {
        const r = [_s, vs].includes(e.key);
        i = Et(t, e.target, r, !0);
      }
      i && (i.focus({ preventScroll: !0 }), zt.getOrCreateInstance(i).show());
    }
    _getChildren() {
      return O.find(xi, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((e) => this._elemIsActive(e)) || null;
    }
    _setInitialAttributes(e, t) {
      this._setAttributeIfNotExists(e, "role", "tablist");
      for (const i of t) this._setInitialAttributesOnChild(i);
    }
    _setInitialAttributesOnChild(e) {
      e = this._getInnerElement(e);
      const t = this._elemIsActive(e),
        i = this._getOuterElement(e);
      e.setAttribute("aria-selected", t),
        i !== e && this._setAttributeIfNotExists(i, "role", "presentation"),
        t || e.setAttribute("tabindex", "-1"),
        this._setAttributeIfNotExists(e, "role", "tab"),
        this._setInitialAttributesOnTargetPanel(e);
    }
    _setInitialAttributesOnTargetPanel(e) {
      const t = O.getElementFromSelector(e);
      t &&
        (this._setAttributeIfNotExists(t, "role", "tabpanel"),
        e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
    }
    _toggleDropDown(e, t) {
      const i = this._getOuterElement(e);
      if (!i.classList.contains("dropdown")) return;
      const r = (a, c) => {
        const f = O.findOne(a, i);
        f && f.classList.toggle(c, t);
      };
      r(ws, Rt), r(".dropdown-menu", yi), i.setAttribute("aria-expanded", t);
    }
    _setAttributeIfNotExists(e, t, i) {
      e.hasAttribute(t) || e.setAttribute(t, i);
    }
    _elemIsActive(e) {
      return e.classList.contains(Rt);
    }
    _getInnerElement(e) {
      return e.matches(xi) ? e : O.findOne(xi, e);
    }
    _getOuterElement(e) {
      return e.closest(".nav-item, .list-group-item") || e;
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = zt.getOrCreateInstance(this);
        if ("string" == typeof e) {
          if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
            throw new TypeError(`No method named "${e}"`);
          t[e]();
        }
      });
    }
  }
  h.on(document, Zo, xs, function (n) {
    ["A", "AREA"].includes(this.tagName) && n.preventDefault(),
      Ie(this) || zt.getOrCreateInstance(this).show();
  }),
    h.on(window, tr, () => {
      for (const n of O.find(sr)) zt.getOrCreateInstance(n);
    }),
    oe(zt);
  const wt = ".bs.toast",
    or = `mouseover${wt}`,
    rr = `mouseout${wt}`,
    ar = `focusin${wt}`,
    lr = `focusout${wt}`,
    cr = `hide${wt}`,
    ur = `hidden${wt}`,
    fr = `show${wt}`,
    dr = `shown${wt}`,
    Gn = "show",
    Jn = "showing",
    hr = { animation: "boolean", autohide: "boolean", delay: "number" },
    pr = { animation: !0, autohide: !0, delay: 5e3 };
  class Ln extends ye {
    constructor(e, t) {
      super(e, t),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return pr;
    }
    static get DefaultType() {
      return hr;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      h.trigger(this._element, fr).defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove("hide"),
        this._element.classList.add(Gn, Jn),
        this._queueCallback(
          () => {
            this._element.classList.remove(Jn),
              h.trigger(this._element, dr),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this.isShown() &&
        (h.trigger(this._element, cr).defaultPrevented ||
          (this._element.classList.add(Jn),
          this._queueCallback(
            () => {
              this._element.classList.add("hide"),
                this._element.classList.remove(Jn, Gn),
                h.trigger(this._element, ur);
            },
            this._element,
            this._config.animation
          )));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(Gn),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(Gn);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(e, t) {
      switch (e.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = t;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = t;
      }
      if (t) return void this._clearTimeout();
      const i = e.relatedTarget;
      this._element === i ||
        this._element.contains(i) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      h.on(this._element, or, (e) => this._onInteraction(e, !0)),
        h.on(this._element, rr, (e) => this._onInteraction(e, !1)),
        h.on(this._element, ar, (e) => this._onInteraction(e, !0)),
        h.on(this._element, lr, (e) => this._onInteraction(e, !1));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(e) {
      return this.each(function () {
        const t = Ln.getOrCreateInstance(this, e);
        if ("string" == typeof e) {
          if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
          t[e](this);
        }
      });
    }
  }
  return (
    we(Ln),
    oe(Ln),
    {
      Alert: _t,
      Button: He,
      Carousel: d,
      Collapse: W,
      Dropdown: Je,
      Modal: Ft,
      Offcanvas: ht,
      Popover: Qn,
      ScrollSpy: kn,
      Tab: zt,
      Toast: Ln,
      Tooltip: Wt,
    }
  );
}),
  (function (X, ne) {
    "object" == typeof exports && typeof module < "u"
      ? ne(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], ne)
      : ne(
          ((X = typeof globalThis < "u" ? globalThis : X || self).Popper = {})
        );
  })(this, function (X) {
    "use strict";
    function ne(o) {
      if (null == o) return window;
      if ("[object Window]" !== o.toString()) {
        var s = o.ownerDocument;
        return (s && s.defaultView) || window;
      }
      return o;
    }
    function Ue(o) {
      return o instanceof ne(o).Element || o instanceof Element;
    }
    function _e(o) {
      return o instanceof ne(o).HTMLElement || o instanceof HTMLElement;
    }
    function qt(o) {
      return (
        typeof ShadowRoot < "u" &&
        (o instanceof ne(o).ShadowRoot || o instanceof ShadowRoot)
      );
    }
    var fe = Math.max,
      De = Math.min,
      Se = Math.round;
    function Ie() {
      var o = navigator.userAgentData;
      return null != o && o.brands && Array.isArray(o.brands)
        ? o.brands
            .map(function (s) {
              return s.brand + "/" + s.version;
            })
            .join(" ")
        : navigator.userAgent;
    }
    function rn() {
      return !/^((?!chrome|android).)*safari/i.test(Ie());
    }
    function Xe(o, s, l) {
      void 0 === s && (s = !1), void 0 === l && (l = !1);
      var u = o.getBoundingClientRect(),
        v = 1,
        d = 1;
      s &&
        _e(o) &&
        ((v = (o.offsetWidth > 0 && Se(u.width) / o.offsetWidth) || 1),
        (d = (o.offsetHeight > 0 && Se(u.height) / o.offsetHeight) || 1));
      var g = (Ue(o) ? ne(o) : window).visualViewport,
        p = !rn() && l,
        _ = (u.left + (p && g ? g.offsetLeft : 0)) / v,
        A = (u.top + (p && g ? g.offsetTop : 0)) / d,
        E = u.width / v,
        y = u.height / d;
      return {
        width: E,
        height: y,
        top: A,
        right: _ + E,
        bottom: A + y,
        left: _,
        x: _,
        y: A,
      };
    }
    function rt(o) {
      var s = ne(o);
      return { scrollLeft: s.pageXOffset, scrollTop: s.pageYOffset };
    }
    function je(o) {
      return o ? (o.nodeName || "").toLowerCase() : null;
    }
    function Ne(o) {
      return (
        (Ue(o) ? o.ownerDocument : o.document) || window.document
      ).documentElement;
    }
    function he(o) {
      return Xe(Ne(o)).left + rt(o).scrollLeft;
    }
    function oe(o) {
      return ne(o).getComputedStyle(o);
    }
    function ce(o) {
      var s = oe(o);
      return /auto|scroll|overlay|hidden/.test(
        s.overflow + s.overflowY + s.overflowX
      );
    }
    function Dn(o, s, l) {
      void 0 === l && (l = !1);
      var u,
        v,
        y,
        z,
        L,
        I,
        d = _e(s),
        g =
          _e(s) &&
          ((z = (y = s).getBoundingClientRect()),
          (L = Se(z.width) / y.offsetWidth || 1),
          (I = Se(z.height) / y.offsetHeight || 1),
          1 !== L || 1 !== I),
        p = Ne(s),
        _ = Xe(o, g, l),
        A = { scrollLeft: 0, scrollTop: 0 },
        E = { x: 0, y: 0 };
      return (
        (d || (!d && !l)) &&
          (("body" !== je(s) || ce(p)) &&
            (A =
              (u = s) !== ne(u) && _e(u)
                ? { scrollLeft: (v = u).scrollLeft, scrollTop: v.scrollTop }
                : rt(u)),
          _e(s)
            ? (((E = Xe(s, !0)).x += s.clientLeft), (E.y += s.clientTop))
            : p && (E.x = he(p))),
        {
          x: _.left + A.scrollLeft - E.x,
          y: _.top + A.scrollTop - E.y,
          width: _.width,
          height: _.height,
        }
      );
    }
    function Et(o) {
      var s = Xe(o),
        l = o.offsetWidth,
        u = o.offsetHeight;
      return (
        Math.abs(s.width - l) <= 1 && (l = s.width),
        Math.abs(s.height - u) <= 1 && (u = s.height),
        { x: o.offsetLeft, y: o.offsetTop, width: l, height: u }
      );
    }
    function Ut(o) {
      return "html" === je(o)
        ? o
        : o.assignedSlot || o.parentNode || (qt(o) ? o.host : null) || Ne(o);
    }
    function Sn(o) {
      return ["html", "body", "#document"].indexOf(je(o)) >= 0
        ? o.ownerDocument.body
        : _e(o) && ce(o)
        ? o
        : Sn(Ut(o));
    }
    function At(o, s) {
      var l;
      void 0 === s && (s = []);
      var u = Sn(o),
        v = u === (null == (l = o.ownerDocument) ? void 0 : l.body),
        d = ne(u),
        g = v ? [d].concat(d.visualViewport || [], ce(u) ? u : []) : u,
        p = s.concat(g);
      return v ? p : p.concat(At(Ut(g)));
    }
    function an(o) {
      return ["table", "td", "th"].indexOf(je(o)) >= 0;
    }
    function ln(o) {
      return _e(o) && "fixed" !== oe(o).position ? o.offsetParent : null;
    }
    function pt(o) {
      for (
        var s = ne(o), l = ln(o);
        l && an(l) && "static" === oe(l).position;

      )
        l = ln(l);
      return l &&
        ("html" === je(l) || ("body" === je(l) && "static" === oe(l).position))
        ? s
        : l ||
            (function (u) {
              var v = /firefox/i.test(Ie());
              if (/Trident/i.test(Ie()) && _e(u) && "fixed" === oe(u).position)
                return null;
              var d = Ut(u);
              for (
                qt(d) && (d = d.host);
                _e(d) && ["html", "body"].indexOf(je(d)) < 0;

              ) {
                var g = oe(d);
                if (
                  "none" !== g.transform ||
                  "none" !== g.perspective ||
                  "paint" === g.contain ||
                  -1 !== ["transform", "perspective"].indexOf(g.willChange) ||
                  (v && "filter" === g.willChange) ||
                  (v && g.filter && "none" !== g.filter)
                )
                  return d;
                d = d.parentNode;
              }
              return null;
            })(o) ||
            s;
    }
    var pe = "top",
      ve = "bottom",
      be = "right",
      de = "left",
      Xt = "auto",
      mt = [pe, ve, be, de],
      et = "start",
      Ot = "end",
      cn = "viewport",
      h = "popper",
      Kt = mt.reduce(function (o, s) {
        return o.concat([s + "-" + et, s + "-" + Ot]);
      }, []),
      un = [].concat(mt, [Xt]).reduce(function (o, s) {
        return o.concat([s, s + "-" + et, s + "-" + Ot]);
      }, []),
      fn = [
        "beforeRead",
        "read",
        "afterRead",
        "beforeMain",
        "main",
        "afterMain",
        "beforeWrite",
        "write",
        "afterWrite",
      ];
    function Ke(o) {
      var s = new Map(),
        l = new Set(),
        u = [];
      function v(d) {
        l.add(d.name),
          []
            .concat(d.requires || [], d.requiresIfExists || [])
            .forEach(function (g) {
              if (!l.has(g)) {
                var p = s.get(g);
                p && v(p);
              }
            }),
          u.push(d);
      }
      return (
        o.forEach(function (d) {
          s.set(d.name, d);
        }),
        o.forEach(function (d) {
          l.has(d.name) || v(d);
        }),
        u
      );
    }
    function gt(o, s) {
      var l = s.getRootNode && s.getRootNode();
      if (o.contains(s)) return !0;
      if (l && qt(l)) {
        var u = s;
        do {
          if (u && o.isSameNode(u)) return !0;
          u = u.parentNode || u.host;
        } while (u);
      }
      return !1;
    }
    function ye(o) {
      return Object.assign({}, o, {
        left: o.x,
        top: o.y,
        right: o.x + o.width,
        bottom: o.y + o.height,
      });
    }
    function Yt(o, s, l) {
      return s === cn
        ? ye(
            (function (u, v) {
              var d = ne(u),
                g = Ne(u),
                p = d.visualViewport,
                _ = g.clientWidth,
                A = g.clientHeight,
                E = 0,
                y = 0;
              if (p) {
                (_ = p.width), (A = p.height);
                var z = rn();
                (z || (!z && "fixed" === v)) &&
                  ((E = p.offsetLeft), (y = p.offsetTop));
              }
              return { width: _, height: A, x: E + he(u), y };
            })(o, l)
          )
        : Ue(s)
        ? (((d = Xe((u = s), !1, "fixed" === l)).top = d.top + u.clientTop),
          (d.left = d.left + u.clientLeft),
          (d.bottom = d.top + u.clientHeight),
          (d.right = d.left + u.clientWidth),
          (d.width = u.clientWidth),
          (d.height = u.clientHeight),
          (d.x = d.left),
          (d.y = d.top),
          d)
        : ye(
            (function (u) {
              var v,
                d = Ne(u),
                g = rt(u),
                p = null == (v = u.ownerDocument) ? void 0 : v.body,
                _ = fe(
                  d.scrollWidth,
                  d.clientWidth,
                  p ? p.scrollWidth : 0,
                  p ? p.clientWidth : 0
                ),
                A = fe(
                  d.scrollHeight,
                  d.clientHeight,
                  p ? p.scrollHeight : 0,
                  p ? p.clientHeight : 0
                ),
                E = -g.scrollLeft + he(u),
                y = -g.scrollTop;
              return (
                "rtl" === oe(p || d).direction &&
                  (E += fe(d.clientWidth, p ? p.clientWidth : 0) - _),
                { width: _, height: A, x: E, y }
              );
            })(Ne(o))
          );
      var u, d;
    }
    function we(o) {
      return o.split("-")[0];
    }
    function at(o) {
      return o.split("-")[1];
    }
    function dn(o) {
      return ["top", "bottom"].indexOf(o) >= 0 ? "x" : "y";
    }
    function jn(o) {
      var s,
        l = o.reference,
        u = o.element,
        v = o.placement,
        d = v ? we(v) : null,
        g = v ? at(v) : null,
        p = l.x + l.width / 2 - u.width / 2,
        _ = l.y + l.height / 2 - u.height / 2;
      switch (d) {
        case pe:
          s = { x: p, y: l.y - u.height };
          break;
        case ve:
          s = { x: p, y: l.y + l.height };
          break;
        case be:
          s = { x: l.x + l.width, y: _ };
          break;
        case de:
          s = { x: l.x - u.width, y: _ };
          break;
        default:
          s = { x: l.x, y: l.y };
      }
      var A = d ? dn(d) : null;
      if (null != A) {
        var E = "y" === A ? "height" : "width";
        switch (g) {
          case et:
            s[A] = s[A] - (l[E] / 2 - u[E] / 2);
            break;
          case Ot:
            s[A] = s[A] + (l[E] / 2 - u[E] / 2);
        }
      }
      return s;
    }
    function _t(o) {
      return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, o);
    }
    function hn(o, s) {
      return s.reduce(function (l, u) {
        return (l[u] = o), l;
      }, {});
    }
    function He(o, s) {
      void 0 === s && (s = {});
      var u = s.placement,
        v = void 0 === u ? o.placement : u,
        d = s.strategy,
        g = void 0 === d ? o.strategy : d,
        p = s.boundary,
        _ = void 0 === p ? "clippingParents" : p,
        A = s.rootBoundary,
        E = void 0 === A ? cn : A,
        y = s.elementContext,
        z = void 0 === y ? h : y,
        L = s.altBoundary,
        I = void 0 !== L && L,
        B = s.padding,
        $ = void 0 === B ? 0 : B,
        ie = _t("number" != typeof $ ? $ : hn($, mt)),
        W = o.rects.popper,
        S = o.elements[I ? (z === h ? "reference" : h) : z],
        T = (function O(o, s, l, u) {
          var _,
            A,
            E,
            v =
              "clippingParents" === s
                ? ((A = At(Ut((_ = o)))),
                  Ue(
                    (E =
                      ["absolute", "fixed"].indexOf(oe(_).position) >= 0 &&
                      _e(_)
                        ? pt(_)
                        : _)
                  )
                    ? A.filter(function (y) {
                        return Ue(y) && gt(y, E) && "body" !== je(y);
                      })
                    : [])
                : [].concat(s),
            d = [].concat(v, [l]),
            p = d.reduce(function (_, A) {
              var E = Yt(o, A, u);
              return (
                (_.top = fe(E.top, _.top)),
                (_.right = De(E.right, _.right)),
                (_.bottom = De(E.bottom, _.bottom)),
                (_.left = fe(E.left, _.left)),
                _
              );
            }, Yt(o, d[0], u));
          return (
            (p.width = p.right - p.left),
            (p.height = p.bottom - p.top),
            (p.x = p.left),
            (p.y = p.top),
            p
          );
        })(Ue(S) ? S : S.contextElement || Ne(o.elements.popper), _, E, g),
        C = Xe(o.elements.reference),
        j = jn({
          reference: C,
          element: W,
          strategy: "absolute",
          placement: v,
        }),
        q = ye(Object.assign({}, W, j)),
        R = z === h ? q : C,
        K = {
          top: T.top - R.top + ie.top,
          bottom: R.bottom - T.bottom + ie.bottom,
          left: T.left - R.left + ie.left,
          right: R.right - T.right + ie.right,
        },
        re = o.modifiersData.offset;
      if (z === h && re) {
        var Ce = re[v];
        Object.keys(K).forEach(function (xe) {
          var me = [be, ve].indexOf(xe) >= 0 ? 1 : -1,
            Pe = [pe, ve].indexOf(xe) >= 0 ? "y" : "x";
          K[xe] += Ce[Pe] * me;
        });
      }
      return K;
    }
    var lt = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function Pn() {
      for (var o = arguments.length, s = new Array(o), l = 0; l < o; l++)
        s[l] = arguments[l];
      return !s.some(function (u) {
        return !(u && "function" == typeof u.getBoundingClientRect);
      });
    }
    function pn(o) {
      void 0 === o && (o = {});
      var l = o.defaultModifiers,
        u = void 0 === l ? [] : l,
        v = o.defaultOptions,
        d = void 0 === v ? lt : v;
      return function (g, p, _) {
        void 0 === _ && (_ = d);
        var A,
          E,
          y = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, lt, d),
            modifiersData: {},
            elements: { reference: g, popper: p },
            attributes: {},
            styles: {},
          },
          z = [],
          L = !1,
          I = {
            state: y,
            setOptions: function ($) {
              var ie = "function" == typeof $ ? $(y.options) : $;
              B(),
                (y.options = Object.assign({}, d, y.options, ie)),
                (y.scrollParents = {
                  reference: Ue(g)
                    ? At(g)
                    : g.contextElement
                    ? At(g.contextElement)
                    : [],
                  popper: At(p),
                });
              var ee,
                W,
                T,
                C,
                S =
                  ((ee = [].concat(u, y.options.modifiers)),
                  (W = ee.reduce(function (T, C) {
                    var j = T[C.name];
                    return (
                      (T[C.name] = j
                        ? Object.assign({}, j, C, {
                            options: Object.assign({}, j.options, C.options),
                            data: Object.assign({}, j.data, C.data),
                          })
                        : C),
                      T
                    );
                  }, {})),
                  (T = Object.keys(W).map(function (T) {
                    return W[T];
                  })),
                  (C = Ke(T)),
                  fn.reduce(function (j, q) {
                    return j.concat(
                      C.filter(function (R) {
                        return R.phase === q;
                      })
                    );
                  }, []));
              return (
                (y.orderedModifiers = S.filter(function (T) {
                  return T.enabled;
                })),
                y.orderedModifiers.forEach(function (T) {
                  var j = T.options,
                    R = T.effect;
                  if ("function" == typeof R) {
                    var K = R({
                      state: y,
                      name: T.name,
                      instance: I,
                      options: void 0 === j ? {} : j,
                    });
                    z.push(K || function () {});
                  }
                }),
                I.update()
              );
            },
            forceUpdate: function () {
              if (!L) {
                var $ = y.elements,
                  ie = $.reference,
                  ee = $.popper;
                if (Pn(ie, ee)) {
                  (y.rects = {
                    reference: Dn(ie, pt(ee), "fixed" === y.options.strategy),
                    popper: Et(ee),
                  }),
                    (y.reset = !1),
                    (y.placement = y.options.placement),
                    y.orderedModifiers.forEach(function (R) {
                      return (y.modifiersData[R.name] = Object.assign(
                        {},
                        R.data
                      ));
                    });
                  for (var W = 0; W < y.orderedModifiers.length; W++)
                    if (!0 !== y.reset) {
                      var S = y.orderedModifiers[W],
                        T = S.fn,
                        C = S.options;
                      "function" == typeof T &&
                        (y =
                          T({
                            state: y,
                            options: void 0 === C ? {} : C,
                            name: S.name,
                            instance: I,
                          }) || y);
                    } else (y.reset = !1), (W = -1);
                }
              }
            },
            update:
              ((A = function () {
                return new Promise(function ($) {
                  I.forceUpdate(), $(y);
                });
              }),
              function () {
                return (
                  E ||
                    (E = new Promise(function ($) {
                      Promise.resolve().then(function () {
                        (E = void 0), $(A());
                      });
                    })),
                  E
                );
              }),
            destroy: function () {
              B(), (L = !0);
            },
          };
        if (!Pn(g, p)) return I;
        function B() {
          z.forEach(function ($) {
            return $();
          }),
            (z = []);
        }
        return (
          I.setOptions(_).then(function ($) {
            !L && _.onFirstUpdate && _.onFirstUpdate($);
          }),
          I
        );
      };
    }
    var Qt = { passive: !0 },
      mn = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function () {},
        effect: function (o) {
          var s = o.state,
            l = o.instance,
            u = o.options,
            v = u.scroll,
            d = void 0 === v || v,
            g = u.resize,
            p = void 0 === g || g,
            _ = ne(s.elements.popper),
            A = [].concat(s.scrollParents.reference, s.scrollParents.popper);
          return (
            d &&
              A.forEach(function (E) {
                E.addEventListener("scroll", l.update, Qt);
              }),
            p && _.addEventListener("resize", l.update, Qt),
            function () {
              d &&
                A.forEach(function (E) {
                  E.removeEventListener("scroll", l.update, Qt);
                }),
                p && _.removeEventListener("resize", l.update, Qt);
            }
          );
        },
        data: {},
      },
      gn = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function (o) {
          var s = o.state;
          s.modifiersData[o.name] = jn({
            reference: s.rects.reference,
            element: s.rects.popper,
            strategy: "absolute",
            placement: s.placement,
          });
        },
        data: {},
      },
      ni = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function Mn(o) {
      var s,
        l = o.popper,
        u = o.popperRect,
        v = o.placement,
        d = o.variation,
        g = o.offsets,
        p = o.position,
        _ = o.gpuAcceleration,
        A = o.adaptive,
        E = o.roundOffsets,
        y = o.isFixed,
        z = g.x,
        L = void 0 === z ? 0 : z,
        I = g.y,
        B = void 0 === I ? 0 : I,
        $ = "function" == typeof E ? E({ x: L, y: B }) : { x: L, y: B };
      (L = $.x), (B = $.y);
      var ie = g.hasOwnProperty("x"),
        ee = g.hasOwnProperty("y"),
        W = de,
        S = pe,
        T = window;
      if (A) {
        var C = pt(l),
          j = "clientHeight",
          q = "clientWidth";
        C === ne(l) &&
          "static" !== oe((C = Ne(l))).position &&
          "absolute" === p &&
          ((j = "scrollHeight"), (q = "scrollWidth")),
          (v === pe || ((v === de || v === be) && d === Ot)) &&
            ((S = ve),
            (B -=
              (y && C === T && T.visualViewport
                ? T.visualViewport.height
                : C[j]) - u.height),
            (B *= _ ? 1 : -1)),
          (v === de || ((v === pe || v === ve) && d === Ot)) &&
            ((W = be),
            (L -=
              (y && C === T && T.visualViewport
                ? T.visualViewport.width
                : C[q]) - u.width),
            (L *= _ ? 1 : -1));
      }
      var R,
        Ce,
        xe,
        Pe,
        se,
        K = Object.assign({ position: p }, A && ni),
        re =
          !0 === E
            ? ((Ce = { x: L, y: B }),
              (xe = ne(l)),
              (Pe = Ce.y),
              {
                x: Se(Ce.x * (se = xe.devicePixelRatio || 1)) / se || 0,
                y: Se(Pe * se) / se || 0,
              })
            : { x: L, y: B };
      return (
        (L = re.x),
        (B = re.y),
        Object.assign(
          {},
          K,
          _
            ? (((R = {})[S] = ee ? "0" : ""),
              (R[W] = ie ? "0" : ""),
              (R.transform =
                (T.devicePixelRatio || 1) <= 1
                  ? "translate(" + L + "px, " + B + "px)"
                  : "translate3d(" + L + "px, " + B + "px, 0)"),
              R)
            : (((s = {})[S] = ee ? B + "px" : ""),
              (s[W] = ie ? L + "px" : ""),
              (s.transform = ""),
              s)
        )
      );
    }
    var vt = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function (o) {
          var s = o.state,
            l = o.options,
            u = l.gpuAcceleration,
            v = void 0 === u || u,
            d = l.adaptive,
            g = void 0 === d || d,
            p = l.roundOffsets,
            _ = void 0 === p || p,
            A = {
              placement: we(s.placement),
              variation: at(s.placement),
              popper: s.elements.popper,
              popperRect: s.rects.popper,
              gpuAcceleration: v,
              isFixed: "fixed" === s.options.strategy,
            };
          null != s.modifiersData.popperOffsets &&
            (s.styles.popper = Object.assign(
              {},
              s.styles.popper,
              Mn(
                Object.assign({}, A, {
                  offsets: s.modifiersData.popperOffsets,
                  position: s.options.strategy,
                  adaptive: g,
                  roundOffsets: _,
                })
              )
            )),
            null != s.modifiersData.arrow &&
              (s.styles.arrow = Object.assign(
                {},
                s.styles.arrow,
                Mn(
                  Object.assign({}, A, {
                    offsets: s.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: _,
                  })
                )
              )),
            (s.attributes.popper = Object.assign({}, s.attributes.popper, {
              "data-popper-placement": s.placement,
            }));
        },
        data: {},
      },
      Fe = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (o) {
          var s = o.state;
          Object.keys(s.elements).forEach(function (l) {
            var u = s.styles[l] || {},
              v = s.attributes[l] || {},
              d = s.elements[l];
            _e(d) &&
              je(d) &&
              (Object.assign(d.style, u),
              Object.keys(v).forEach(function (g) {
                var p = v[g];
                !1 === p
                  ? d.removeAttribute(g)
                  : d.setAttribute(g, !0 === p ? "" : p);
              }));
          });
        },
        effect: function (o) {
          var s = o.state,
            l = {
              popper: {
                position: s.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(s.elements.popper.style, l.popper),
            (s.styles = l),
            s.elements.arrow && Object.assign(s.elements.arrow.style, l.arrow),
            function () {
              Object.keys(s.elements).forEach(function (u) {
                var v = s.elements[u],
                  d = s.attributes[u] || {},
                  g = Object.keys(
                    s.styles.hasOwnProperty(u) ? s.styles[u] : l[u]
                  ).reduce(function (p, _) {
                    return (p[_] = ""), p;
                  }, {});
                _e(v) &&
                  je(v) &&
                  (Object.assign(v.style, g),
                  Object.keys(d).forEach(function (p) {
                    v.removeAttribute(p);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      },
      _n = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function (o) {
          var s = o.state,
            u = o.name,
            v = o.options.offset,
            d = void 0 === v ? [0, 0] : v,
            g = un.reduce(function (E, y) {
              return (
                (E[y] =
                  ((L = s.rects),
                  (I = d),
                  (B = we((z = y))),
                  ($ = [de, pe].indexOf(B) >= 0 ? -1 : 1),
                  (ee =
                    (ee = (ie =
                      "function" == typeof I
                        ? I(Object.assign({}, L, { placement: z }))
                        : I)[0]) || 0),
                  (W = ((W = ie[1]) || 0) * $),
                  [de, be].indexOf(B) >= 0
                    ? { x: W, y: ee }
                    : { x: ee, y: W })),
                E
              );
              var z, L, I, B, $, ie, ee, W;
            }, {}),
            p = g[s.placement],
            A = p.y;
          null != s.modifiersData.popperOffsets &&
            ((s.modifiersData.popperOffsets.x += p.x),
            (s.modifiersData.popperOffsets.y += A)),
            (s.modifiersData[u] = g);
        },
      },
      Tt = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function Ye(o) {
      return o.replace(/left|right|bottom|top/g, function (s) {
        return Tt[s];
      });
    }
    var bt = { start: "end", end: "start" };
    function Ct(o) {
      return o.replace(/start|end/g, function (s) {
        return bt[s];
      });
    }
    var Gt = {
      name: "flip",
      enabled: !0,
      phase: "main",
      fn: function (o) {
        var s = o.state,
          l = o.options,
          u = o.name;
        if (!s.modifiersData[u]._skip) {
          for (
            var v = l.mainAxis,
              d = void 0 === v || v,
              g = l.altAxis,
              p = void 0 === g || g,
              _ = l.fallbackPlacements,
              A = l.padding,
              E = l.boundary,
              y = l.rootBoundary,
              z = l.altBoundary,
              L = l.flipVariations,
              I = void 0 === L || L,
              B = l.allowedAutoPlacements,
              $ = s.options.placement,
              ie = we($),
              ee =
                _ ||
                (ie !== $ && I
                  ? (function (ke) {
                      if (we(ke) === Xt) return [];
                      var Le = Ye(ke);
                      return [Ct(ke), Le, Ct(Le)];
                    })($)
                  : [Ye($)]),
              W = [$].concat(ee).reduce(function (ke, Le) {
                return ke.concat(
                  we(Le) === Xt
                    ? (function ii(o, s) {
                        void 0 === s && (s = {});
                        var v = s.boundary,
                          d = s.rootBoundary,
                          g = s.padding,
                          p = s.flipVariations,
                          _ = s.allowedAutoPlacements,
                          A = void 0 === _ ? un : _,
                          E = at(s.placement),
                          y = E
                            ? p
                              ? Kt
                              : Kt.filter(function (I) {
                                  return at(I) === E;
                                })
                            : mt,
                          z = y.filter(function (I) {
                            return A.indexOf(I) >= 0;
                          });
                        0 === z.length && (z = y);
                        var L = z.reduce(function (I, B) {
                          return (
                            (I[B] = He(o, {
                              placement: B,
                              boundary: v,
                              rootBoundary: d,
                              padding: g,
                            })[we(B)]),
                            I
                          );
                        }, {});
                        return Object.keys(L).sort(function (I, B) {
                          return L[I] - L[B];
                        });
                      })(s, {
                        placement: Le,
                        boundary: E,
                        rootBoundary: y,
                        padding: A,
                        flipVariations: I,
                        allowedAutoPlacements: B,
                      })
                    : Le
                );
              }, []),
              S = s.rects.reference,
              T = s.rects.popper,
              C = new Map(),
              j = !0,
              q = W[0],
              R = 0;
            R < W.length;
            R++
          ) {
            var K = W[R],
              re = we(K),
              Ce = at(K) === et,
              xe = [pe, ve].indexOf(re) >= 0,
              me = xe ? "width" : "height",
              Pe = He(s, {
                placement: K,
                boundary: E,
                rootBoundary: y,
                altBoundary: z,
                padding: A,
              }),
              se = xe ? (Ce ? be : de) : Ce ? ve : pe;
            S[me] > T[me] && (se = Ye(se));
            var We = Ye(se),
              tt = [];
            if (
              (d && tt.push(Pe[re] <= 0),
              p && tt.push(Pe[se] <= 0, Pe[We] <= 0),
              tt.every(function (ke) {
                return ke;
              }))
            ) {
              (q = K), (j = !1);
              break;
            }
            C.set(K, tt);
          }
          if (j)
            for (
              var Dt = function (ke) {
                  var Le = W.find(function (St) {
                    var jt = C.get(St);
                    if (jt)
                      return jt.slice(0, ke).every(function (Pt) {
                        return Pt;
                      });
                  });
                  if (Le) return (q = Le), "break";
                },
                ct = I ? 3 : 1;
              ct > 0 && "break" !== Dt(ct);
              ct--
            );
          s.placement !== q &&
            ((s.modifiersData[u]._skip = !0),
            (s.placement = q),
            (s.reset = !0));
        }
      },
      requiresIfExists: ["offset"],
      data: { _skip: !1 },
    };
    function kt(o, s, l) {
      return fe(o, De(s, l));
    }
    var $n = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (o) {
          var ft,
            On,
            s = o.state,
            l = o.options,
            u = o.name,
            v = l.mainAxis,
            d = void 0 === v || v,
            g = l.altAxis,
            p = void 0 !== g && g,
            z = l.tether,
            L = void 0 === z || z,
            I = l.tetherOffset,
            B = void 0 === I ? 0 : I,
            $ = He(s, {
              boundary: l.boundary,
              rootBoundary: l.rootBoundary,
              padding: l.padding,
              altBoundary: l.altBoundary,
            }),
            ie = we(s.placement),
            ee = at(s.placement),
            W = !ee,
            S = dn(ie),
            T = "x" === S ? "y" : "x",
            C = s.modifiersData.popperOffsets,
            j = s.rects.reference,
            q = s.rects.popper,
            R =
              "function" == typeof B
                ? B(Object.assign({}, s.rects, { placement: s.placement }))
                : B,
            K =
              "number" == typeof R
                ? { mainAxis: R, altAxis: R }
                : Object.assign({ mainAxis: 0, altAxis: 0 }, R),
            re = s.modifiersData.offset
              ? s.modifiersData.offset[s.placement]
              : null,
            Ce = { x: 0, y: 0 };
          if (C) {
            if (d) {
              var xe,
                me = "y" === S ? pe : de,
                Pe = "y" === S ? ve : be,
                se = "y" === S ? "height" : "width",
                We = C[S],
                tt = We + $[me],
                Dt = We - $[Pe],
                ct = L ? -q[se] / 2 : 0,
                ke = ee === et ? j[se] : q[se],
                Le = ee === et ? -q[se] : -j[se],
                St = s.elements.arrow,
                jt = L && St ? Et(St) : { width: 0, height: 0 },
                Pt = s.modifiersData["arrow#persistent"]
                  ? s.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                vn = Pt[me],
                bn = Pt[Pe],
                Ee = kt(0, j[se], jt[se]),
                Ae = W
                  ? j[se] / 2 - ct - Ee - vn - K.mainAxis
                  : ke - Ee - vn - K.mainAxis,
                ut = W
                  ? -j[se] / 2 + ct + Ee + bn + K.mainAxis
                  : Le + Ee + bn + K.mainAxis,
                ge = s.elements.arrow && pt(s.elements.arrow),
                yn = ge
                  ? "y" === S
                    ? ge.clientTop || 0
                    : ge.clientLeft || 0
                  : 0,
                Jt = null != (xe = re?.[S]) ? xe : 0,
                Be = We + ut - Jt,
                nt = kt(
                  L ? De(tt, We + Ae - Jt - yn) : tt,
                  We,
                  L ? fe(Dt, Be) : Dt
                );
              (C[S] = nt), (Ce[S] = nt - We);
            }
            if (p) {
              var Mt,
                it = C[T],
                Qe = "y" === T ? "height" : "width",
                Zt = it + $["x" === S ? pe : de],
                xn = it - $["x" === S ? ve : be],
                Me = -1 !== [pe, de].indexOf(ie),
                Rn = null != (Mt = re?.[T]) ? Mt : 0,
                Ge = Me ? Zt : it - j[Qe] - q[Qe] - Rn + K.altAxis,
                $t = Me ? it + j[Qe] + q[Qe] - Rn - K.altAxis : xn,
                En =
                  L && Me
                    ? (On = kt(Ge, it, (ft = $t))) > ft
                      ? ft
                      : On
                    : kt(L ? Ge : Zt, it, L ? $t : xn);
              (C[T] = En), (Ce[T] = En - it);
            }
            s.modifiersData[u] = Ce;
          }
        },
        requiresIfExists: ["offset"],
      },
      In = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function (o) {
          var s,
            q,
            R,
            l = o.state,
            u = o.name,
            v = o.options,
            d = l.elements.arrow,
            g = l.modifiersData.popperOffsets,
            p = we(l.placement),
            _ = dn(p),
            A = [de, be].indexOf(p) >= 0 ? "height" : "width";
          if (d && g) {
            var E =
                ((R = l),
                _t(
                  "number" !=
                    typeof (q =
                      "function" == typeof (q = v.padding)
                        ? q(
                            Object.assign({}, R.rects, {
                              placement: R.placement,
                            })
                          )
                        : q)
                    ? q
                    : hn(q, mt)
                )),
              y = Et(d),
              z = "y" === _ ? pe : de,
              L = "y" === _ ? ve : be,
              I =
                l.rects.reference[A] +
                l.rects.reference[_] -
                g[_] -
                l.rects.popper[A],
              B = g[_] - l.rects.reference[_],
              $ = pt(d),
              ie = $
                ? "y" === _
                  ? $.clientHeight || 0
                  : $.clientWidth || 0
                : 0,
              T = ie / 2 - y[A] / 2 + (I / 2 - B / 2),
              C = kt(E[z], T, ie - y[A] - E[L]);
            l.modifiersData[u] =
              (((s = {})[_] = C), (s.centerOffset = C - T), s);
          }
        },
        effect: function (o) {
          var s = o.state,
            l = o.options.element,
            u = void 0 === l ? "[data-popper-arrow]" : l;
          null != u &&
            ("string" != typeof u ||
              (u = s.elements.popper.querySelector(u))) &&
            gt(s.elements.popper, u) &&
            (s.elements.arrow = u);
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"],
      };
    function Nn(o, s, l) {
      return (
        void 0 === l && (l = { x: 0, y: 0 }),
        {
          top: o.top - s.height - l.y,
          right: o.right - s.width + l.x,
          bottom: o.bottom - s.height + l.y,
          left: o.left - s.width - l.x,
        }
      );
    }
    function Hn(o) {
      return [pe, be, ve, de].some(function (s) {
        return o[s] >= 0;
      });
    }
    var Fn = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function (o) {
          var s = o.state,
            l = o.name,
            u = s.rects.reference,
            v = s.rects.popper,
            d = s.modifiersData.preventOverflow,
            g = He(s, { elementContext: "reference" }),
            p = He(s, { altBoundary: !0 }),
            _ = Nn(g, u),
            A = Nn(p, v, d),
            E = Hn(_),
            y = Hn(A);
          (s.modifiersData[l] = {
            referenceClippingOffsets: _,
            popperEscapeOffsets: A,
            isReferenceHidden: E,
            hasPopperEscaped: y,
          }),
            (s.attributes.popper = Object.assign({}, s.attributes.popper, {
              "data-popper-reference-hidden": E,
              "data-popper-escaped": y,
            }));
        },
      },
      Wn = pn({ defaultModifiers: [mn, gn, vt, Fe] }),
      Lt = [mn, gn, vt, Fe, _n, Gt, $n, In, Fn],
      Bn = pn({ defaultModifiers: Lt });
    (X.applyStyles = Fe),
      (X.arrow = In),
      (X.computeStyles = vt),
      (X.createPopper = Bn),
      (X.createPopperLite = Wn),
      (X.defaultModifiers = Lt),
      (X.detectOverflow = He),
      (X.eventListeners = mn),
      (X.flip = Gt),
      (X.hide = Fn),
      (X.offset = _n),
      (X.popperGenerator = pn),
      (X.popperOffsets = gn),
      (X.preventOverflow = $n),
      Object.defineProperty(X, "__esModule", { value: !0 });
  });
