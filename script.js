var themeSwitcher = {}

themeSwitcher.options = {
  setdefaulttheme: true,
  defaulttheme: "",
  debug: false,
  rememberlasttheme: true,
  transitionduration: '1s',
  transitioneffect: 'ease-in',
  checkjQuery: true
}

themeSwitcher.setup = async function(options) {
  options = options || {}

  Object.assign(themeSwitcher.options,options)

  tsdebug("Options:",themeSwitcher.options)
  
  if((typeof jQuery !== "function") && (themeSwitcher.options.checkjQuery)) {
    tsdebug("jQuery Not Present")
    await themeSwitcher.utils.addjQuery()
    tsdebug("jQuery Added")
  }

  if(themeSwitcher.options.rememberlasttheme) {
    var lasttheme = localStorage.getItem("ts-lasttheme")
    if(lasttheme) {
      tsdebug("Previously selected theme found:",lasttheme)
      themeSwitcher.change(lasttheme)
    } else {
      tsdebug("Previous theme not found.")
      if(themeSwitcher.options.setdefaulttheme) {
        tsdebug("Setting default theme")
        
        var defaulttheme = themeSwitcher.options.defaulttheme
        tsdebug("Applying default theme:",defaulttheme)
        themeSwitcher.change(defaulttheme)
        localStorage.setItem("ts-lasttheme",defaulttheme)
      }
    }
  } else {
    if(themeSwitcher.options.setdefaulttheme) {
      tsdebug("Setting default theme")
        
      var defaulttheme = themeSwitcher.options.defaulttheme
      tsdebug("Applying default theme:",defaulttheme)
      themeSwitcher.change(defaulttheme)
      localStorage.setItem("ts-lasttheme",defaulttheme)
    }
  }
}

themeSwitcher.change = function(themename) {
  var theme = themeSwitcher.themes[themename]
  if(!theme) console.error("Theme not found. Did you set up the theme?")

  tsdebug("Switching to theme:",themename,theme)

  var style = document.documentElement.style
  
  for(property in theme) {
    var value = theme[property]

    if((typeof value) == "string") {
      // CSS ROOT VARIABLES
      tsdebug("Theme property:",property,value)
  
      style.setProperty(`--${property}`, value);  
    } else if(property == "classes") {
      // SPECIFIC CLASSES
      var classes = value
      tsdebug("Theme classes:",classes)

      for(classname in classes) {
        var value = classes[classname]
        tsdebug("Class:",classname,"Value(s):",value)

        for(property in value) {
          var propertyvalue = value[property]
          tsdebug("Property:",property,"Value:",propertyvalue)

          $(`.${classname}`).css(property,propertyvalue)
        }
      }
    }
  }

  if(themeSwitcher.options.rememberlasttheme) {
    localStorage.setItem("ts-lasttheme",themename)
  }
}

themeSwitcher.utils = {}

themeSwitcher.utils.debug = function(...content) {
  if(themeSwitcher.options.debug) {
    console.log(...content)
  }
}
var tsdebug = themeSwitcher.utils.debug

themeSwitcher.utils.addjQuery = async function() {
  var addjQuery = new Promise((resolve, reject) => {
    var s = document.createElement("script");
    s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    if (s.addEventListener) {
      s.addEventListener("load", resolve, false)
    } else if (s.readyState) {
      s.onreadystatechange = resolve
    }
    document.body.appendChild(s);
  })
  await addjQuery
}