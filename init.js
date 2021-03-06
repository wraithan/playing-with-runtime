var Screen = require('./screen.js')
var map = require('./keymap.js')

// location and dimensions of VGA frame buffer
var start = 0xB8000
var bytes = 2
var cols  = 80
var rows  = 25
var size  = cols * rows * bytes

// initialize display based on frame buffer
var display = new Uint16Array(buff(start, size))
var screen  = new Screen(display)

// welcome message
screen.write('Welcome to Runtime')
prompt()

// run loop
var currentLine = []
while(true) {
  var num
    , key

  if (1 === poll()) // check for keyboard events
  if (num = inb(0x60)) // get key pressed
  if (key = map(num)) // convert key code to character
  if (key === '\n') {
    screen.newline()
    screen.write(String(eval(currentLine.join(''))))
    currentLine = []
    prompt() // special handle newline
  }
  else if (key === '\b') {
    currentLine.pop()
    screen.backspace() // special handle backspace
  }
  else if (key === '^c') {
    screen.write('BAIL THE FUCK OUT')
  }
  else if (key) {
    currentLine.push(key)
    screen.write(key) // write key to screen
  }
  else screen.write('.') // write unknown characters as '.'
}

//---

function prompt() {
  screen.newline()
  screen.write('wraith-os >')
}
