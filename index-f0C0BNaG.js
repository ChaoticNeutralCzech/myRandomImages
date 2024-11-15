(
  function () {
    const e = document.createElement('link').relList;
    if (e && e.supports && e.supports('modulepreload')) return;
    for (
      const i of document.querySelectorAll('link[rel="modulepreload"]')
    ) o(i);
    new MutationObserver(
      i => {
        for (const g of i) if (g.type === 'childList') for (const B of g.addedNodes) B.tagName === 'LINK' &&
        B.rel === 'modulepreload' &&
        o(B)
      }
    ).observe(document, {
      childList: !0,
      subtree: !0
    });
    function A(i) {
      const g = {};
      return i.integrity &&
      (g.integrity = i.integrity),
      i.referrerPolicy &&
      (g.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials' ? g.credentials = 'include' : i.crossOrigin === 'anonymous' ? g.credentials = 'omit' : g.credentials = 'same-origin',
      g
    }
    function o(i) {
      if (i.ep) return;
      i.ep = !0;
      const g = A(i);
      fetch(i.href, g)
    }
  }
) ();
var W = {
  exports: {
  }
};
W.exports;
(
  function (t) {
    var e = function () {
      var A = String.fromCharCode,
      o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      i = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$',
      g = {};
      function B(s, n) {
        if (!g[s]) {
          g[s] = {};
          for (var a = 0; a < s.length; a++) g[s][s.charAt(a)] = a
        }
        return g[s][n]
      }
      var I = {
        compressToBase64: function (s) {
          if (s == null) return '';
          var n = I._compress(s, 6, function (a) {
            return o.charAt(a)
          });
          switch (n.length % 4) {
            default:
            case 0:
              return n;
            case 1:
              return n + '===';
            case 2:
              return n + '==';
            case 3:
              return n + '='
          }
        },
        decompressFromBase64: function (s) {
          return s == null ? '' : s == '' ? null : I._decompress(s.length, 32, function (n) {
            return B(o, s.charAt(n))
          })
        },
        compressToUTF16: function (s) {
          return s == null ? '' : I._compress(s, 15, function (n) {
            return A(n + 32)
          }) + ' '
        },
        decompressFromUTF16: function (s) {
          return s == null ? '' : s == '' ? null : I._decompress(s.length, 16384, function (n) {
            return s.charCodeAt(n) - 32
          })
        },
        compressToUint8Array: function (s) {
          for (
            var n = I.compress(s),
            a = new Uint8Array(n.length * 2),
            c = 0,
            l = n.length;
            c < l;
            c++
          ) {
            var h = n.charCodeAt(c);
            a[c * 2] = h >>> 8,
            a[c * 2 + 1] = h % 256
          }
          return a
        },
        decompressFromUint8Array: function (s) {
          if (s == null) return I.decompress(s);
          for (var n = new Array(s.length / 2), a = 0, c = n.length; a < c; a++) n[a] = s[a * 2] * 256 + s[a * 2 + 1];
          var l = [];
          return n.forEach(function (h) {
            l.push(A(h))
          }),
          I.decompress(l.join(''))
        },
        compressToEncodedURIComponent: function (s) {
          return s == null ? '' : I._compress(s, 6, function (n) {
            return i.charAt(n)
          })
        },
        decompressFromEncodedURIComponent: function (s) {
          return s == null ? '' : s == '' ? null : (
            s = s.replace(/ /g, '+'),
            I._decompress(s.length, 32, function (n) {
              return B(i, s.charAt(n))
            })
          )
        },
        compress: function (s) {
          return I._compress(s, 16, function (n) {
            return A(n)
          })
        },
        _compress: function (s, n, a) {
          if (s == null) return '';
          var c,
          l,
          h = {},
          u = {},
          S = '',
          m = '',
          d = '',
          F = 2,
          M = 3,
          C = 2,
          w = [],
          r = 0,
          Q = 0,
          E;
          for (E = 0; E < s.length; E += 1) if (
            S = s.charAt(E),
            Object.prototype.hasOwnProperty.call(h, S) ||
            (h[S] = M++, u[S] = !0),
            m = d + S,
            Object.prototype.hasOwnProperty.call(h, m)
          ) d = m;
           else {
            if (Object.prototype.hasOwnProperty.call(u, d)) {
              if (d.charCodeAt(0) < 256) {
                for (c = 0; c < C; c++) r = r << 1,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++;
                for (l = d.charCodeAt(0), c = 0; c < 8; c++) r = r << 1 | l & 1,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
                l = l >> 1
              } else {
                for (l = 1, c = 0; c < C; c++) r = r << 1 | l,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
                l = 0;
                for (l = d.charCodeAt(0), c = 0; c < 16; c++) r = r << 1 | l & 1,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
                l = l >> 1
              }
              F--,
              F == 0 &&
              (F = Math.pow(2, C), C++),
              delete u[d]
            } else for (l = h[d], c = 0; c < C; c++) r = r << 1 | l & 1,
            Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
            l = l >> 1;
            F--,
            F == 0 &&
            (F = Math.pow(2, C), C++),
            h[m] = M++,
            d = String(S)
          }
          if (d !== '') {
            if (Object.prototype.hasOwnProperty.call(u, d)) {
              if (d.charCodeAt(0) < 256) {
                for (c = 0; c < C; c++) r = r << 1,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++;
                for (l = d.charCodeAt(0), c = 0; c < 8; c++) r = r << 1 | l & 1,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
                l = l >> 1
              } else {
                for (l = 1, c = 0; c < C; c++) r = r << 1 | l,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
                l = 0;
                for (l = d.charCodeAt(0), c = 0; c < 16; c++) r = r << 1 | l & 1,
                Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
                l = l >> 1
              }
              F--,
              F == 0 &&
              (F = Math.pow(2, C), C++),
              delete u[d]
            } else for (l = h[d], c = 0; c < C; c++) r = r << 1 | l & 1,
            Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
            l = l >> 1;
            F--,
            F == 0 &&
            (F = Math.pow(2, C), C++)
          }
          for (l = 2, c = 0; c < C; c++) r = r << 1 | l & 1,
          Q == n - 1 ? (Q = 0, w.push(a(r)), r = 0) : Q++,
          l = l >> 1;
          for (; ; ) if (r = r << 1, Q == n - 1) {
            w.push(a(r));
            break
          } else Q++;
          return w.join('')
        },
        decompress: function (s) {
          return s == null ? '' : s == '' ? null : I._decompress(s.length, 32768, function (n) {
            return s.charCodeAt(n)
          })
        },
        _decompress: function (s, n, a) {
          var c = [],
          l = 4,
          h = 4,
          u = 3,
          S = '',
          m = [],
          d,
          F,
          M,
          C,
          w,
          r,
          Q,
          E = {
            val: a(0),
            position: n,
            index: 1
          };
          for (d = 0; d < 3; d += 1) c[d] = d;
          for (M = 0, w = Math.pow(2, 2), r = 1; r != w; ) C = E.val & E.position,
          E.position >>= 1,
          E.position == 0 &&
          (E.position = n, E.val = a(E.index++)),
          M |= (C > 0 ? 1 : 0) * r,
          r <<= 1;
          switch (M) {
            case 0:
              for (M = 0, w = Math.pow(2, 8), r = 1; r != w; ) C = E.val & E.position,
              E.position >>= 1,
              E.position == 0 &&
              (E.position = n, E.val = a(E.index++)),
              M |= (C > 0 ? 1 : 0) * r,
              r <<= 1;
              Q = A(M);
              break;
            case 1:
              for (M = 0, w = Math.pow(2, 16), r = 1; r != w; ) C = E.val & E.position,
              E.position >>= 1,
              E.position == 0 &&
              (E.position = n, E.val = a(E.index++)),
              M |= (C > 0 ? 1 : 0) * r,
              r <<= 1;
              Q = A(M);
              break;
            case 2:
              return ''
          }
          for (c[3] = Q, F = Q, m.push(Q); ; ) {
            if (E.index > s) return '';
            for (M = 0, w = Math.pow(2, u), r = 1; r != w; ) C = E.val & E.position,
            E.position >>= 1,
            E.position == 0 &&
            (E.position = n, E.val = a(E.index++)),
            M |= (C > 0 ? 1 : 0) * r,
            r <<= 1;
            switch (Q = M) {
              case 0:
                for (M = 0, w = Math.pow(2, 8), r = 1; r != w; ) C = E.val & E.position,
                E.position >>= 1,
                E.position == 0 &&
                (E.position = n, E.val = a(E.index++)),
                M |= (C > 0 ? 1 : 0) * r,
                r <<= 1;
                c[h++] = A(M),
                Q = h - 1,
                l--;
                break;
              case 1:
                for (M = 0, w = Math.pow(2, 16), r = 1; r != w; ) C = E.val & E.position,
                E.position >>= 1,
                E.position == 0 &&
                (E.position = n, E.val = a(E.index++)),
                M |= (C > 0 ? 1 : 0) * r,
                r <<= 1;
                c[h++] = A(M),
                Q = h - 1,
                l--;
                break;
              case 2:
                return m.join('')
            }
            if (l == 0 && (l = Math.pow(2, u), u++), c[Q]) S = c[Q];
             else if (Q === h) S = F + F.charAt(0);
             else return null;
            m.push(S),
            c[h++] = F + S.charAt(0),
            l--,
            F = S,
            l == 0 &&
            (l = Math.pow(2, u), u++)
          }
        }
      };
      return I
    }();
    t != null ? t.exports = e : typeof angular < 'u' &&
    angular != null &&
    angular.module('LZString', []).factory('LZString', function () {
      return e
    })
  }
) (W);
var ge = W.exports;
function ne(t) {
  let e = t.length,
  A;
  for (; e != 0; ) A = Math.floor(Math.random() * e),
  e--,
  [
    t[e],
    t[A]
  ] = [
    t[A],
    t[e]
  ];
  return t
}
let re = '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';
function ae() {
  return JSON.parse(ge.decompressFromBase64(re))
}
function le(t) {
  let e = document.createElement('span');
  e.textContent = t,
  document.body.append(e);
  let A = e.offsetWidth;
  return e.remove(),
  A
}
function ce(t) {
  return Array.prototype.indexOf.call(t.parentNode.childNodes, t)
}
function Y(t) {
  return t.city + ', ' + t.country
}
function Be(t) {
  let e = document.createElement('textarea');
  e.value = t,
  e.style.top = '0',
  e.style.left = '0',
  e.style.position = 'fixed',
  document.body.appendChild(e),
  e.focus(),
  e.select();
  try {
    let A = document.execCommand('copy')
  } catch (A) {
    console.error('Fallback: Oops, unable to copy', A)
  }
  document.body.removeChild(e)
}
function Ee(t) {
  if (!navigator.clipboard) {
    Be(t);
    return
  }
  navigator.clipboard.writeText(t)
}
class Ie {
  constructor(e) {
    this.storage = e,
    this.zoomLevels = [
      19,
      17,
      15,
      12,
      9,
      5
    ],
    this.zoomLevel = 0
  }
  async initMap(e) {
    const {
      Map: A
    }
    = await google.maps.importLibrary('maps');
    this.storage.isGameOver ? this.zoomLevel = this.storage.guesses.length - 1 : this.zoomLevel = this.storage.guesses.length;
    let o = this.zoomLevels[this.zoomLevel];
    this.map = new A(
      document.getElementById('map'),
      {
        zoom: o,
        center: e,
        disableDefaultUI: !0,
        gestureHandling: 'none',
        keyboardShortcuts: !1,
        zoomControl: !1,
        mapTypeControl: !1,
        scaleControl: !1,
        streetViewControl: !1,
        rotateControl: !1,
        fullscreenControl: !1,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      }
    )
  }
  resetZoom() {
    this.map.setZoom(this.zoomLevels[this.zoomLevel])
  }
  setZoomToIndex(e) {
    this.map.setZoom(this.zoomLevels[e])
  }
  zoomOutMap() {
    this.zoomLevel += 1,
    this.map.setZoom(this.zoomLevels[this.zoomLevel])
  }
}
class Qe {
  constructor(e) {
    localStorage.getItem('gamesPlayed') === null &&
    (localStorage.gamesPlayed = 0),
    this.gamesPlayed = parseInt(localStorage.gamesPlayed),
    localStorage.getItem('gamesWon') === null &&
    (localStorage.gamesWon = 0),
    this.gamesWon = parseInt(localStorage.gamesWon),
    localStorage.getItem('currentStreak') === null &&
    (localStorage.currentStreak = 0),
    this.currentStreak = parseInt(localStorage.currentStreak),
    localStorage.getItem('longestStreak') === null &&
    (localStorage.longestStreak = 0),
    this.longestStreak = parseInt(localStorage.longestStreak),
    localStorage.getItem('guessDistributions') === null &&
    (
      localStorage.guessDistributions = JSON.stringify([0,
      0,
      0,
      0,
      0,
      0])
    ),
    this.guessDistributions = JSON.parse(localStorage.guessDistributions),
    localStorage.getItem('isGameOver') === null &&
    (localStorage.isGameOver = JSON.stringify(!0)),
    this.isGameOver = JSON.parse(localStorage.isGameOver),
    localStorage.getItem('currentSatleId') == e &&
    localStorage.getItem('guesses') !== null ? this.guesses = JSON.parse(localStorage.guesses) : (
      localStorage.currentSatleId = e,
      this.isGameOver = !1,
      this.guesses = Array(),
      localStorage.guesses = JSON.stringify(this.guesses),
      localStorage.isGameOver = JSON.stringify(this.isGameOver)
    ),
    localStorage.getItem('showDistance') === null &&
    (localStorage.showDistance = JSON.stringify(!0)),
    this.showDistance = JSON.parse(localStorage.showDistance),
    localStorage.getItem('metricDistance') === null &&
    (localStorage.metricDistance = JSON.stringify(!0)),
    this.metricDistance = JSON.parse(localStorage.metricDistance)
  }
  updateStatistics(e) {
    this.isGameOver = !0,
    this.gamesPlayed += 1,
    e ? (
      this.gamesWon += 1,
      this.currentStreak += 1,
      this.currentStreak > this.longestStreak &&
      (this.longestStreak = this.currentStreak),
      this.guessDistributions[this.guesses.length - 1] += 1
    ) : this.currentStreak = 0,
    localStorage.isGameOver = JSON.stringify(this.isGameOver),
    localStorage.gamesPlayed = parseInt(this.gamesPlayed),
    localStorage.gamesWon = parseInt(this.gamesWon),
    localStorage.currentStreak = parseInt(this.currentStreak),
    localStorage.longestStreak = parseInt(this.longestStreak),
    localStorage.guessDistributions = JSON.stringify(this.guessDistributions)
  }
  addGuess(e) {
    this.guesses.push(e),
    localStorage.guesses = JSON.stringify(this.guesses)
  }
  toggleShowDistance() {
    this.showDistance = !this.showDistance,
    localStorage.showDistance = JSON.stringify(this.showDistance)
  }
  toggleMetricDistance() {
    this.metricDistance = !this.metricDistance,
    localStorage.metricDistance = JSON.stringify(this.metricDistance)
  }
}
function he() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const paramNum = urlParams.get('num')
  let satleID = 0;
  satleID = paramNum;
  if (!satleID)
  {
	let t = 2024,
    e = 215,
    A = new Date,
    o = 0;
    for (let i = t; i < A.getFullYear(); i++) o += 365,
    ee(i) &&
    (o += 1);
    return o += A.getDOY() - e,
    o < 0 &&
    (o = 0),
    o
  }
  return satleID;
}
function ee(t) {
  return t & 3 ? !1 : t % 100 != 0 ||
  t % 400 == 0
}
Date.prototype.isLeapYear = function () {
  var t = this.getFullYear();
  return ee(t)
};
Date.prototype.getDOY = function () {
  var t = [
    0,
    31,
    59,
    90,
    120,
    151,
    181,
    212,
    243,
    273,
    304,
    334
  ],
  e = this.getMonth(),
  A = this.getDate(),
  o = t[e] + A;
  return e > 1 &&
  this.isLeapYear() &&
  o++,
  o
};
function Ce(t) {
  let e = t,
  A,
  o,
  i;
  setInterval(
    function () {
      A = parseInt(e / (60 * 60), 10),
      o = parseInt(e / 60 % 60, 10),
      i = parseInt(e % 60, 10),
      A = A < 10 ? '0' + A : A,
      o = o < 10 ? '0' + o : o,
      i = i < 10 ? '0' + i : i,
      document.querySelectorAll('.satle-countdown').forEach(function (g) {
        g.textContent = A + ':' + o + ':' + i
      }),
      --e < 0 &&
      (e = t)
    },
    1000
  )
}
function we() {
  let t = new Date,
  e = new Date(t);
  return e.setHours(24, 0, 0, 0),
  (e - t) / 60000
}
const K = N;
function x() {
  const t = [
    'href',
    '6AAttUC',
    '221095RblBko',
    '<div class="container" style="height: 100%;"><div class="row pt-5" style="height: 100%;"><div class="col-12 pt-5"><div class="alert alert-danger mt-5" role="alert"><h4 class="alert-heading">⚠️ This game is stolen!</h4><p>I created Satle which has been stolen by this website. I work hard in my spare time to produce Satle out of love for the people who enjoy playing, and this website has stolen my code outright.</p><hr><p class="mb-0">Please visit the official Satle <a href="',
    '3717615YHmjvC',
    'aHR0cHM6Ly9zYXRsZS5jYS8=',
    'innerHTML',
    '1471326TiCvrb',
    '6320TLiWLh',
    '2ySLKxX',
    '5019595PimlIX',
    'location',
    'body',
    '3098832hxWkJw',
    'startsWith',
    '10uYxBxS',
    '6318kWfMkE',
    '60414NpbwpK',
    'aHR0cHM6Ly9zYXRsZS5icmVuZGFuaW5uaXMuY2E=',
    '40QGszXd'
  ];
  return x = function () {
    return t
  },
  x()
}(
  function (t, e) {
    const A = N,
    o = t();
    for (; ; ) try {
      if (
        parseInt(A(324)) / 1 * (parseInt(A(332)) / 2) + parseInt(A(322)) / 3 + - parseInt(A(334)) / 4 * (parseInt(A(337)) / 5) + - parseInt(A(336)) / 6 * (parseInt(A(325)) / 7) + - parseInt(A(323)) / 8 * ( - parseInt(A(331)) / 9) + parseInt(A(330)) / 10 * (parseInt(A(339)) / 11) + parseInt(A(328)) / 12 === e
      ) break;
      o.push(o.shift())
    } catch {
      o.push(o.shift())
    }
  }
) (x, 542362);
function N(t, e) {
  const A = x();
  return N = function (o, i) {
    return o = o - 321,
    A[o]
  },
  N(t, e)
}
let z = window[K(326)][K(335)];
!z[K(329)](atob(K(333))) &&
!z[K(329)](atob('aHR0cHM6Ly9zYXRsZS5jYS8=')) &&
(
  document[K(327)][K(321)] = K(338) + atob(K(340)) + '">here</a>, on my website.</p></div></div></div></div>'
);
let De = we() * 60;
Ce(De);
const de = '➡',
Me = '↘',
Fe = '⬇',
ue = '↙',
Se = '⬅',
pe = '↖',
me = '⬆',
ke = '↗';
function Ke(t, e, A, o, i) {
  let g = 6371,
  B = R(o - e),
  I = R(i - A),
  s = Math.sin(B / 2) * Math.sin(B / 2) + Math.cos(R(e)) * Math.cos(R(o)) * Math.sin(I / 2) * Math.sin(I / 2),
  n = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)),
  a = g * n;
  return Math.round(t ? a : Je(a))
}
function Ue(t, e, A, o) {
  let i = Ye(t, e, A, o);
  if (i > 337.5 || i <= 22.5) return me;
  if (i > 22.5 && i <= 67.5) return ke;
  if (i > 67.5 && i <= 112.5) return de;
  if (i > 112.5 && i <= 157.5) return Me;
  if (i > 157.5 && i <= 202.5) return Fe;
  if (i > 202.5 && i <= 247.5) return ue;
  if (i > 247.5 && i <= 292.5) return Se;
  if (i > 292.5 && i <= 337.5) return pe
}
function Ye(t, e, A, o) {
  let i = R(o - e),
  g = Math.log(Math.tan(R(A) / 2 + Math.PI / 4) / Math.tan(R(t) / 2 + Math.PI / 4));
  return Math.abs(i) > Math.PI &&
  (i = i > 0 ? - (2 * Math.PI - i) : 2 * Math.PI + i),
  Ge(Math.atan2(i, g))
}
function R(t) {
  return t * (Math.PI / 180)
}
function Re(t) {
  return t * 180 / Math.PI
}
function Ge(t) {
  return (Re(t) + 360) % 360
}
function Je(t) {
  return t * 0.6214
}
class xe {
  constructor(e, A, o, i, g) {
    this.storage = e,
    this.showDistSwitch = A,
    this.distUnitSwitch = o,
    this.distUnitValue = i,
    this.emailButton = g
  }
  bindSettings(e) {
    let A = this;
    this.showDistSwitch.checked = this.storage.showDistance,
    this.showDistSwitch.addEventListener('change', o => {
      A.storage.toggleShowDistance(),
      e()
    }),
    this.distUnitSwitch.checked = this.storage.metricDistance,
    this.distUnitValue.textContent = this.storage.metricDistance ? 'km' : 'mi',
    this.distUnitSwitch.addEventListener(
      'change',
      o => {
        A.storage.toggleMetricDistance(),
        A.distUnitValue.textContent = this.storage.metricDistance ? 'km' : 'mi',
        e()
      }
    ),
    this.emailButton.addEventListener(
      'click',
      function () {
        window.open(
          'mailto:brendaninnis@icloud.com?subject=Satle%20Feedback&body=' + A.buildFeedbackBody()
        )
      }
    )
  }
  buildFeedbackBody() {
    return '%0A%0A---%0AGame Details:%0A' + JSON.stringify(localStorage) + '%0A%0ADevice Details:%0A' + window.navigator.userAgent
  }
}
function Ne(t, e, A, o) {
  function i(g) {
    return g instanceof A ? g : new A(function (B) {
      B(g)
    })
  }
  return new (A || (A = Promise)) (
    function (g, B) {
      function I(a) {
        try {
          n(o.next(a))
        } catch (c) {
          B(c)
        }
      }
      function s(a) {
        try {
          n(o.throw(a))
        } catch (c) {
          B(c)
        }
      }
      function n(a) {
        a.done ? g(a.value) : i(a.value).then(I, s)
      }
      n((o = o.apply(t, [])).next())
    }
  )
}
function Oe(t) {
  return t &&
  t.__esModule &&
  Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t
}
var Le = function t(e, A) {
  if (e === A) return !0;
  if (e && A && typeof e == 'object' && typeof A == 'object') {
    if (e.constructor !== A.constructor) return !1;
    var o,
    i,
    g;
    if (Array.isArray(e)) {
      if (o = e.length, o != A.length) return !1;
      for (i = o; i-- !== 0; ) if (!t(e[i], A[i])) return !1;
      return !0
    }
    if (e.constructor === RegExp) return e.source === A.source &&
    e.flags === A.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === A.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === A.toString();
    if (g = Object.keys(e), o = g.length, o !== Object.keys(A).length) return !1;
    for (i = o; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(A, g[i])) return !1;
    for (i = o; i-- !== 0; ) {
      var B = g[i];
      if (!t(e[B], A[B])) return !1
    }
    return !0
  }
  return e !== e &&
  A !== A
},
He = Oe(Le);
const X = '__googleMapsScriptId';
var G;
(
  function (t) {
    t[t.INITIALIZED = 0] = 'INITIALIZED',
    t[t.LOADING = 1] = 'LOADING',
    t[t.SUCCESS = 2] = 'SUCCESS',
    t[t.FAILURE = 3] = 'FAILURE'
  }
) (G || (G = {}));
class U {
  constructor({
    apiKey: e,
    authReferrerPolicy: A,
    channel: o,
    client: i,
    id: g = X,
    language: B,
    libraries: I = [],
    mapIds: s,
    nonce: n,
    region: a,
    retries: c = 3,
    url: l = 'https://maps.googleapis.com/maps/api/js',
    version: h
  }) {
    if (
      this.callbacks = [],
      this.done = !1,
      this.loading = !1,
      this.errors = [],
      this.apiKey = e,
      this.authReferrerPolicy = A,
      this.channel = o,
      this.client = i,
      this.id = g ||
      X,
      this.language = B,
      this.libraries = I,
      this.mapIds = s,
      this.nonce = n,
      this.region = a,
      this.retries = c,
      this.url = l,
      this.version = h,
      U.instance
    ) {
      if (!He(this.options, U.instance.options)) throw new Error(
        `Loader must not be called again with different options. ${ JSON.stringify(this.options) } !== ${ JSON.stringify(U.instance.options) }`
      );
      return U.instance
    }
    U.instance = this
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    }
  }
  get status() {
    return this.errors.length ? G.FAILURE : this.done ? G.SUCCESS : this.loading ? G.LOADING : G.INITIALIZED
  }
  get failed() {
    return this.done &&
    !this.loading &&
    this.errors.length >= this.retries + 1
  }
  createUrl() {
    let e = this.url;
    return e += '?callback=__googleMapsCallback&loading=async',
    this.apiKey &&
    (e += `&key=${ this.apiKey }`),
    this.channel &&
    (e += `&channel=${ this.channel }`),
    this.client &&
    (e += `&client=${ this.client }`),
    this.libraries.length > 0 &&
    (e += `&libraries=${ this.libraries.join(',') }`),
    this.language &&
    (e += `&language=${ this.language }`),
    this.region &&
    (e += `&region=${ this.region }`),
    this.version &&
    (e += `&v=${ this.version }`),
    this.mapIds &&
    (e += `&map_ids=${ this.mapIds.join(',') }`),
    this.authReferrerPolicy &&
    (e += `&auth_referrer_policy=${ this.authReferrerPolicy }`),
    e
  }
  deleteScript() {
    const e = document.getElementById(this.id);
    e &&
    e.remove()
  }
  load() {
    return this.loadPromise()
  }
  loadPromise() {
    return new Promise(
      (e, A) => {
        this.loadCallback(o => {
          o ? A(o.error) : e(window.google)
        })
      }
    )
  }
  importLibrary(e) {
    return this.execute(),
    google.maps.importLibrary(e)
  }
  loadCallback(e) {
    this.callbacks.push(e),
    this.execute()
  }
  setScript() {
    var e,
    A;
    if (document.getElementById(this.id)) {
      this.callback();
      return
    }
    const o = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length &&
      this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(o).forEach(g => !o[g] && delete o[g]),
    !(
      (
        A = (e = window == null ? void 0 : window.google) === null ||
        e === void 0 ? void 0 : e.maps
      ) === null ||
      A === void 0
    ) &&
    A.importLibrary ||
    (
      g => {
        let B,
        I,
        s,
        n = 'The Google Maps JavaScript API',
        a = 'google',
        c = 'importLibrary',
        l = '__ib__',
        h = document,
        u = window;
        u = u[a] ||
        (u[a] = {});
        const S = u.maps ||
        (u.maps = {}),
        m = new Set,
        d = new URLSearchParams,
        F = () => B ||
        (
          B = new Promise(
            (M, C) => Ne(
              this,
              void 0,
              void 0,
              function * () {
                var w;
                yield I = h.createElement('script'),
                I.id = this.id,
                d.set('libraries', [
                  ...m
                ] + '');
                for (s in g) d.set(s.replace(/[A-Z]/g, r => '_' + r[0].toLowerCase()), g[s]);
                d.set('callback', a + '.maps.' + l),
                I.src = this.url + '?' + d,
                S[l] = M,
                I.onerror = () => B = C(Error(n + ' could not load.')),
                I.nonce = this.nonce ||
                (
                  (w = h.querySelector('script[nonce]')) === null ||
                  w === void 0 ? void 0 : w.nonce
                ) ||
                '',
                h.head.append(I)
              }
            )
          )
        );
        S[c] ? console.warn(n + ' only loads once. Ignoring:', g) : S[c] = (M, ...C) => m.add(M) &&
        F().then(() => S[c](M, ...C))
      }
    ) (o);
    const i = this.libraries.map(g => this.importLibrary(g));
    i.length ||
    i.push(this.importLibrary('core')),
    Promise.all(i).then(
      () => this.callback(),
      g => {
        const B = new ErrorEvent('error', {
          error: g
        });
        this.loadErrorCallback(B)
      }
    )
  }
  reset() {
    this.deleteScript(),
    this.done = !1,
    this.loading = !1,
    this.errors = [],
    this.onerrorEvent = null
  }
  resetIfRetryingFailed() {
    this.failed &&
    this.reset()
  }
  loadErrorCallback(e) {
    if (this.errors.push(e), this.errors.length <= this.retries) {
      const A = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${ A } ms.`),
      setTimeout(() => {
        this.deleteScript(),
        this.setScript()
      }, A)
    } else this.onerrorEvent = e,
    this.callback()
  }
  callback() {
    this.done = !0,
    this.loading = !1,
    this.callbacks.forEach(e => {
      e(this.onerrorEvent)
    }),
    this.callbacks = []
  }
  execute() {
    if (this.resetIfRetryingFailed(), !this.loading) if (this.done) this.callback();
     else {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.version
      ) {
        console.warn(
          'Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match.'
        ),
        this.callback();
        return
      }
      this.loading = !0,
      this.setScript()
    }
  }
}
const ye = '🛰',
fe = '🟩',
Ve = '⬛',
Te = '🟥',
je = '⬜',
O = 'Skip',
P = 6,
f = 300,
_ = [
  'currentStreak',
  'gamesWon',
  'longestStreak',
  'showDistance',
  'guesses',
  'isGameOver',
  'guessDistributions',
  'metricDistance',
  'currentSatleId',
  'gamesPlayed'
],
V = new URLSearchParams(window.location.search),
Ze = document.querySelectorAll('[data-bs-toggle="popover"]');
[
  ...Ze
].map(t => new bootstrap.Popover(t));
let We = new bootstrap.Modal(document.getElementById('helpModal'), {
}),
Pe = new bootstrap.Modal(document.getElementById('update1Modal'), {
}),
be = new bootstrap.Modal(document.getElementById('update2Modal'), {
}),
qe = new bootstrap.Modal(document.getElementById('gameEndModal'), {
});
var b = !1;
const $ = 'satle.ca';
if (window.location.hostname !== $) {
  let t = function () {
    return _.reduce(
      (o, i) => {
        let g = localStorage.getItem(i);
        if (g !== null) {
          let B = encodeURIComponent(i),
          I = encodeURIComponent(g);
          o.push(`${ B }=${ I }`)
        }
        return o
      },
      []
    ).join('&')
  };
  var st = t;
  let e = 'https://' + $;
  localStorage.instructionsShown &&
  (e = e + '?' + t());
  try {
    window.location.replace(e),
    b = !0
  } catch {
    throw document.body.innerHTML = '<div class="container" style="height: 100%;"><div class="row pt-5" style="height: 100%;"><div class="col-12 pt-5"><div class="alert alert-primary mt-5" role="alert"><h4 class="alert-heading">⚠️  Satle has moved.</h4><p>To visit the new home of Satle <a href="' + e + '">click here</a>.</p></div></div></div></div>',
    new Error('Failed to redirect')
  }
} else V.size !== 0 &&
!localStorage.storagePorted &&
(
  _.forEach(
    t => {
      if (V.has(t)) {
        let e = decodeURIComponent(V.get(t));
        localStorage.setItem(t, e)
      }
    }
  ),
  Pe.show(),
  localStorage.storagePorted = !0,
  localStorage.instructionsShown = !0,
  localStorage.update2Shown = !0
);
try {
  window.top !== window.self &&
  (window.top.location.replace(window.self.location.href), b = !0)
} catch {
  if (window.top !== window.self) throw document.body.innerHTML = '<div class="container" style="height: 100%;"><div class="row pt-5" style="height: 100%;"><div class="col-12 pt-5"><div class="alert alert-danger mt-5" role="alert"><h4 class="alert-heading">⚠️ This game is stolen!</h4><p>I created Satle which has been stolen by this website. I work hard in my spare time to produce Satle out of love for the people who enjoy playing, and this website has stolen my code and hosting outright.</p><hr><p class="mb-0">Please visit the official Satle <a href="' + atob('aHR0cHM6Ly9zYXRsZS5jYS8=') + '">here</a>, on my website.</p></div></div></div></div>',
  new Error('Satle stolen in iframe')
}
if (b) throw new Error('Redirecting...');
console.log('Passed pre-game checks');
const L = ae(),
p = L[he() % L.length],
te = p.id,
ve = p.loc,
D = new Qe(te),
ze = new U({
  apiKey: 'AIzaSyBsAJ8zq3tIH-ALCwimBjWxb5rrQETrwJ8',
  version: 'weekly'
}),
H = new Ie(D);
ze.load().then(async() => {
  await H.initMap(ve)
}).catch(t => {
  console.error(t)
});
let Xe = document.getElementById('show-distance-switch'),
_e = document.getElementById('distance-units-switch'),
$e = document.getElementById('distance-units-value'),
et = document.getElementById('emailButton'),
tt = new xe(D, Xe, _e, $e, et);
function q() {
  twemoji.parse(
    document.body,
    {
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
    }
  )
}
function v(t) {
  let e = t.split(',');
  if (e.length < 2) return !1;
  let A = e[0],
  o = e[1];
  return L.find(
    i => i.city.toLowerCase().trim() === A.toLowerCase().trim() &&
    i.country.toLowerCase().trim() === o.toLowerCase().trim()
  )
}
function y(t) {
  return t ? t.city === p.city &&
  t.country === p.country : !1
}
let k = document.getElementById('guessBox');
function T(t) {
  document.getElementById('playedValue').textContent = D.gamesPlayed,
  D.gamesPlayed > 0 &&
  (
    document.getElementById('winPercentValue').textContent = parseInt(parseFloat(D.gamesWon) / parseFloat(D.gamesPlayed) * 100)
  ),
  document.getElementById('currentStreakValue').textContent = D.currentStreak,
  document.getElementById('longestStreakValue').textContent = D.longestStreak;
  let e = D.guessDistributions,
  A = 1;
  for (const i in e) {
    let g = e[i];
    g > A &&
    (A = g)
  }
  let o = document.getElementById('distributions');
  o.textContent = '';
  for (const i in e) {
    let g = parseInt(i) + 1,
    B = e[i],
    I = 'auto';
    B > 0 &&
    (I = parseInt(B / A * 100) + '%');
    let s = document.createElement('div');
    s.classList.add('row'),
    s.classList.add('align-items-center');
    let n = document.createElement('div');
    n.classList.add('col-1');
    let a = document.createElement('p');
    a.classList.add('my-auto'),
    a.textContent = g,
    n.appendChild(a),
    s.appendChild(n);
    let c = document.createElement('div');
    c.classList.add('col-11');
    let l = document.createElement('div');
    l.classList.add('p-1'),
    l.classList.add('guess-distribution'),
    l.style.minWidth = I,
    g == t &&
    l.classList.add('guess-number');
    let h = document.createElement('span');
    h.style.marginRight = '8px',
    h.style.cssFloat = 'right',
    h.textContent = B,
    l.appendChild(h),
    c.appendChild(l),
    s.appendChild(c),
    o.appendChild(s)
  }
}
function At(t) {
  D.updateStatistics(t),
  j(t),
  Z(t)
}
function j(t) {
  let e = document.getElementById('gameEndTitle'),
  A = document.getElementById('gameEndText'),
  o = document.getElementById('gameEndMap');
  if (t) {
    e.textContent = 'Correct!';
    let g = 'You got it in ' + D.guesses.length + ' guess';
    D.guesses.length > 1 &&
    (g += 'es'),
    g += '!',
    A.textContent = g
  } else e.textContent = 'Incorrect!',
  A.textContent = 'Try again tomorrow.';
  let i = document.createElement('iframe');
  i.style.border = '0',
  i.setAttribute('width', '100%'),
  i.setAttribute('height', '100%'),
  i.setAttribute('allowfullscreen', ''),
  i.setAttribute('loading', 'lazy'),
  i.setAttribute('referrerPolicy', 'no-referrer-when-downgrade'),
  i.setAttribute(
    'src',
    'https://www.google.com/maps/embed/v1/view?center=' + p.loc.lat + ',' + p.loc.lng + '&zoom=5&maptype=satellite&key=AIzaSyBsAJ8zq3tIH-ALCwimBjWxb5rrQETrwJ8'
  ),
  o.textContent = '',
  o.append(i),
  qe.show()
}
function Z(t) {
  document.getElementById('submitBtn').setAttribute('disabled', !0),
  document.removeEventListener('keydown', ie),
  D.isGameOver = !0,
  t ? T(D.guesses.length) : T()
}
function it(t) {
  t.replace(/\s/g, '').length ||
  (t = O);
  let e = v(t);
  if (t !== O && !e) {
    let I = document.getElementById('guessWarning');
    return I.classList.contains('show') ? (
      I.classList.contains('big') ||
      (
        I.classList.add('big'),
        setTimeout(function () {
          I.classList.remove('big')
        }, 500)
      ),
      !1
    ) : (
      I.classList.add('show'),
      setTimeout(function () {
        I.classList.remove('show')
      }, 3000),
      !1
    )
  }
  D.addGuess(t);
  let A = Ae(e),
  o = document.getElementById('guesses'),
  i = 0;
  D.guesses.length > 1 &&
  (i = f);
  let g = (le(A.textContent) + 48) * 0.5;
  return function (I, s, n, a) {
    if (n < 1) {
      a();
      return
    }
    let c = s / (n / 10),
    l = 0,
    h;
    function u() {
      l += c,
      I.style.left = l + 'px',
      l >= s &&
      (clearInterval(h), a())
    }
    h = setInterval(u, 10)
  }(
    o,
    g,
    i,
    function () {
      o.style.left = '0px',
      o.prepend(A),
      q(),
      setTimeout(
        function () {
          let I = y(e),
          s = I ||
          D.guesses.length >= P;
          setTimeout(function () {
            s ? At(I) : H.zoomOutMap()
          }, f)
        },
        f
      )
    }
  ),
  !0
}
function Ae(t) {
  let e = document.createElement('span');
  if (e.classList.add('guess'), !t) e.textContent = O;
   else if (y(t)) e.textContent = Y(t),
  e.classList.add('right'),
  e.setAttribute('data-bs-toggle', 'modal'),
  e.setAttribute('data-bs-target', '#gameEndModal');
   else if (e.textContent = Y(t), e.classList.add('wrong'), D.showDistance) {
    let A = D.metricDistance ? 'km' : 'mi';
    e.textContent = Ke(D.metricDistance, t.loc.lat, t.loc.lng, p.loc.lat, p.loc.lng) + ' ' + A + ' ' + Ue(t.loc.lat, t.loc.lng, p.loc.lat, p.loc.lng) + ' of ' + Y(t)
  }
  return e.addEventListener(
    'click',
    A => {
      let o = D.guesses.length - ce(A.target) - 1;
      H.setZoomToIndex(o)
    }
  ),
  e
}
function ot() {
  let t = document.getElementsByClassName('autocomplete-option'),
  e = function () {
    document.getElementById('autocompleteList').textContent = '',
    k.value = this.textContent,
    k.focus()
  },
  A = function (i) {
    let g = Array.from(t).findIndex(B => B.classList.contains('selected'));
    g >= 0 &&
    t[g].classList.remove('selected'),
    i.target.classList.add('selected')
  };
  for (var o = 0; o < t.length; o++) t[o].addEventListener('click', e, !1),
  t[o].addEventListener('mouseover', A, !1),
  o === t.length - 1 &&
  t[o].classList.add('selected')
}
function ie(t) {
  let e = document.getElementsByClassName('autocomplete-option'),
  A = Array.from(e).findIndex(o => o.classList.contains('selected'));
  if (t.key === 'ArrowUp' || t.key === 'ArrowDown') {
    if (e.length === 0) return;
    A >= 0 ? e[A].classList.remove('selected') : A = - 1,
    t.key === 'ArrowUp' ? (A -= 1, A < 0 && (A = e.length - 1)) : (A += 1, A >= e.length && (A = 0)),
    e[A].classList.add('selected')
  } else if (t.key === 'Enter') {
    t.preventDefault();
    let o = e.length <= 1;
    if (A >= 0) {
      let i = e[A];
      document.getElementById('autocompleteList').textContent = '',
      k.value = i.textContent,
      k.focus()
    }
    o &&
    oe()
  }
}
document.addEventListener('keydown', ie);
k.addEventListener(
  'input',
  t => {
    let e = document.getElementById('autocompleteList');
    e.textContent = '';
    let A = k.value.toLowerCase();
    if (A === '' || D.isGameOver) return;
    let o = Array(),
    i = ne(L.slice());
    for (let g = 0; g < i.length; g++) {
      let B = i[g];
      B.city.toLowerCase().startsWith(A) ||
      B.country.toLowerCase().startsWith(A) ||
      Y(B).toLowerCase().startsWith(A) ? o.unshift(Y(B)) : (
        B.city.toLowerCase().includes(A) ||
        B.country.toLowerCase().includes(A) ||
        Y(B).toLowerCase().includes(A)
      ) &&
      o.push(Y(B))
    }
    o = [
      ...new Set(o)
    ];
    for (let g = 0; g < o.length && g < 5; g++) {
      let B = o[g],
      I = 0,
      s = 0,
      n = 0;
      for (let l = 0; l < B.length; l++) if (B.toLowerCase().charAt(l) == A.charAt(n)) {
        if (n == 0 && (I = l), n += 1, n == A.length) {
          s = l + 1;
          break
        }
      } else n = 0;
      let a = document.createElement('li');
      a.classList.add('list-group-item'),
      a.classList.add('autocomplete-option'),
      a.classList.add('text-light'),
      a.append(B.slice(0, I));
      let c = document.createElement('strong');
      c.textContent = B.slice(I, s),
      a.append(c),
      a.append(B.slice(s)),
      e.prepend(a)
    }
    ot()
  }
);
function oe() {
  document.getElementById('autocompleteList').textContent = '',
  it(k.value) &&
  (k.value = null)
}
document.getElementById('guessForm').addEventListener('submit', t => {
  t.preventDefault(),
  oe()
});
document.getElementById('shareButton').addEventListener(
  'click',
  t => {
    let e = ye + 'Satle #' + te + ' ' + D.guesses.length + `/6

    `;
    for (let A = 0; A < P; A++) if (A < D.guesses.length) {
      let o = v(D.guesses[A]);
      y(o) ? e += fe : D.guesses[A] === O ? e += Ve : e += Te
    } else e += je;
    e += `
https://satle.ca
    `,
    Ee(e)
  }
);
document.getElementById('gameEndAnswer').textContent = 'Answer: ' + p.city + ', ' + p.country + ' ' + p.emoji;
document.getElementById('gameEndName').textContent = '📍 ' + p.name;
document.getElementById('gameEndDescription').textContent = p.description;
k.addEventListener('focus', t => {
  H.resetZoom()
});
let J = !0;
function se() {
  let t = document.getElementById('guesses');
  t.textContent = '';
  for (const e in D.guesses) {
    let A = D.guesses[e],
    o = v(A),
    i = Ae(o);
    t.prepend(i),
    y(o) &&
    J &&
    (j(!0), Z(!0), J = !1)
  }
  D.guesses.length >= P &&
  J &&
  (j(!1), Z(!1), J = !1),
  q()
}
D.isGameOver &&
document.getElementById('submitBtn').setAttribute('disabled', !0);
T();
se();
k.focus();
localStorage.instructionsShown ? localStorage.update3Shown ||
be.show() : We.show();
localStorage.instructionsShown = !0;
localStorage.update3Shown = !0;
tt.bindSettings(se);
q();
