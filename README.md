
# themeswitcher.js

A intuitive way to easily create themes for a website.


## Installation

Install themeswitcher.js via a CDN link or by downloading the script and including it.

```html
<script src="https://cdn.jsdelivr.net/gh/stellasphere/themeswitcher.js@main/script.js">
```

Also, this package uses jQuery. Either include it manually or run `themeSwitcher.setup()` asynchronously to have themeswitcher.js add the jQuery script.
## Usage/Examples

[See the full CodePen example](https://codepen.io/stellasphere/pen/BarWKqg)

**CSS**
```css
// CSS ROOT VARIABLES
:root {
  --maincolor: black;
  --backgroundcolor: white;
}

body {
  color: var(--maincolor);
  background-color: var(--backgroundcolor);
  transition: 1s; // Transitions can help the theme change look smooth.
}

header {
  background-color: var(--backgroundcolor);
  box-shadow: 0 -30px 20px 20px var(--maincolor);
}
```

**JavaScript**
```javascript
window.onload = async function() {
  // SET UP THE THEMES
  themeSwitcher.themes = {
    light: {
      maincolor: "black",
      backgroundcolor: "white"
    },
    dark: {
      maincolor: "white",
      backgroundcolor: "black"
    }
  }
  
  // SETUP FUNCTION (Run with async/await if you need themeswitcher.js to include jQuery)
  await themeSwitcher.setup({
    defaulttheme: "light",
  })
}
```


## Reference

### Setup
*`async function themeSwitcher.setup(options)`*

#### Example

```js
await themeSwitcher.setup({
    setdefaulttheme: true,
    defaulttheme: "",
    debug: false,
    rememberlasttheme: true,
    checkjQuery: true
})
```

#### Options
| Parameter | Description                |
| :-------- | :------- |
| `setdefaulttheme` | Whether to set the default theme if a previous theme is not found. *Default: true* |
| `defaulttheme` | **Required Parameter** Specifies which theme to default to. *No Default* |
| `debug` | Whether to output debug messages to the console. *Default: false* |
| `rememberlasttheme` | Whether to store what the user's last selected theme was and 're-set' it when they visit the next time. *Default: true* |
| `checkjQuery` | Whether to check if jQuery (which is a dependency of themeswitcher.js) is present. *Default: true* |

### Set themes
*`static property themeSwitcher.theme = {}`*

#### Example
```js
themeSwitcher.themes = {
    light: {
        maincolor: "black",
        backgroundcolor: "white",
        classes: {
            "test-class": {
                "background-color": "white"
            }
        }
    },
    dark: {
        maincolor: "white",
        backgroundcolor: "black",
        classes: {
            "test-class": {
                "background-color": "black"
            }
        }
    }
}
```

In the above example, if the theme is set to `light`, anywhere where `var(--maincolor)` is used will "resolve" to `black`, anywhere where `var(--backgroundcolor)` is used will resolve to `white` and the class `.test-class` will have a white background.

The themes object is supposed to be in the following structure: 
```
{
    *theme name*: {
        *css variable*: *css value*,
        *another css variable*: *css value*
        classes: {
            *css class*: {
                *css property*: *css value*
            }
        }
    }
}
```
- Theme name: Used to identify the theme.
- CSS variable: The name of the CSS variable.
- Classes: It is possible to set custom CSS values to specific classes if under the property `classes` with a object.
- CSS class: A class.
- CSS property: A [valid CSS property](https://www.w3schools.com/cssref/).
- CSS value: A value for the property.


### Change theme
*`async function themeSwitcher.change(themename)`*

#### Example
```js
themeSwitcher.change('dark');
```

#### Arguments
- **themename**: The id/name of the theme to switch to