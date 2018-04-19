Présentations
=============

Ces présentations sont basées sur [AccesSlide](https://github.com/access42/AccesSlide), un framework pour réaliser des présentations accessibles en HTML5-CSS3-JS.

## Transition personnalisée

Ma touche perso sur les animations est assez simple à reproduire, si cela vous intéresse.

### Déclarer la nouvelle transition

Dans [AccesSlide.js](https://github.com/ffoodd/AccesSlide/blob/master/AccesSlide.js#L155), il suffit d'ajouter l'objet suivant :

```javascript
 // FFOODD
  ffoodd: {
    val: 'ffoodd',
    classSetting: 'ffoodd',
    flap: false,
    slide: false,
    group: 'Geffects'
  },
```

### Ajouter les styles

Comme vous le voyez je désactive les effets en JS, pour [gérer la transition uniquement en CSS](https://github.com/ffoodd/AccesSlide/blob/master/css/themes/ffoodd.css#L717).
Ça ressemble à ça :

```css
@keyframes move-up {
  from {
    transform: translateY( 100% ) translateZ( 0 );
    opacity: 0;
  }
}

[data-effect="ffoodd"] #wrapper {
  animation: move-up .8s cubic-bezier(0.165, 0.840, 0.440, 1.000);
}

/** @subsection 9.2 SLIDING **/
@media screen {
  [data-effect="ffoodd"] .slide {
    display: block !important;
    opacity: 0;
    position: absolute;
    top: 0 !important;
    visibility: hidden;
    transform-style: preserve-3d;
    transition: transform-origin .8s cubic-bezier(.26, .86, .44, .985),
                transform .8s cubic-bezier(.26, .86, .44, .985),
                visibility .8s cubic-bezier(.26, .86, .44, .985),
                opacity .8s cubic-bezier(.26, .86, .44, .985);
  }

  [data-effect="ffoodd"] .slide[style*="display: none"] {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transform: translate3d(-150%, 0, 0);
    visibility: hidden;
  }

  [data-effect="ffoodd"] .slide[style*="display: block"] {
    opacity: 1          !important;
    position: relative  !important;
    visibility: visible !important;
  }

  [data-effect="ffoodd"] .slide[style*="display: block"] ~ .slide[style*="display: none"] {
    transform: translate3d(150%, 0, 0);
  }
}
```

Et voilà !