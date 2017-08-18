# Background

Gone the days we use table to define a simple grid layout for our webpages. Latest CSS specification is getting more refined to the point that it is now possible to define a complex layout with a simple markup structure. I can go back in time and remember back in the day when a minimalist markup structure for 3-column layout was really hard to achieve whenever padding and background that stretched to the height across those columns. Then `-webkit-box-sizing` css attribute was introduced, that took padding complexity out of the equation by turning back the clock, remodel the old box model metaphor into IE6-like box model. 

For this simple experiment, I want to put `display : flex` css attribute to good use. I want a simple markup structure that can easily define my app layout in minimalistic way, crystal clear and straight forward. Cut me some slack hunting for those width/height defined somewhere deep inside our commonly shared global css.

Well, something like:

```
<h>
	<w style='background:#eee'></w>
	<w></w>
</h>

```

Will get me:

![Two Columns](https://brucewangsg.github.io/flexapplayout/images/twocolumns-no-annotation.png)


# Usage

## Custom HTML Tags

I'm introducing 3 custom html tags: `v`, `h`, and `w`. Those are shortest I can get down to because `v-box` and `h-box` simply don't sound cool at all.   

- `v` is a wrapper where all childNodes inside it will fill up the space in the `column` direction (`flex-direction : column`). This is pretty similar when you have one `div` after another. The next `div` will fill the next row space. The sum of heights for all the childNodes will be equal to the height of this wrapper. 

- `h` is a wrapper where all childNodes inside it will fill up the space in the `row` direction (`flex-direction : row`). This is pretty similar when you have `float : left` divs. The next `div` will fill the space on the right of the previous div. The sum of widths for all the childNodes will be equal to the width of this wrapper. 

- `w` will be just plain vanilla wrapper that goes along with `v`, `h` parentNode. This wrapper won't modify how its childNodes should be layout. It will simply fallback to default browser flow layout depending of what childNodes inside it (e.g. display: block div, or display: inline-block tabs etc).


Break into two columns:

```
<h>
	<w style='background:#eee'></w>
	<w></w>
</h>

```

Break into two rows:

```
<v>
	<w style='background:#eee'></w>
	<w></w>
</v>

```

## Custom HTML Attributes

It's a total authoritarian to have every columns and rows have the same width or height. Let's say I just want my sidebar to stick with 320px while the next column(s) can distribute the remaining width equally. 

Here you go:

```
<h>
	<w class='cc-sidebar' wd='320' style='background:#eee'></w>
	<w></w>
</h>

```

Introducing `wd`, `hg`, `mwd`, `mhg` attributes.

- `wd` is for width, it will force that element to have an arbitrary fix width specified in the attribute.
- `hg` is for height, similarly this will set the fix height.
- `mwd` is width that only applies when you are on display is in mobile screen format i.e. screenWidth <= 600.
- `mhg` is height that only applies when you are on display is in mobile screen format i.e. screenWidth <= 600.

Note on mobile screen. For some scenario, you might want your 2 columns layout to turn into single column layout, hide the sidebar. You can do this:

```
<h>
	<w class='cc-sidebar' wd='320' mwd='0' style='background:#eee'></w>
	<w></w>
</h>

```

That was easy at all, wasn't it? All you have to remember is `v`, `h`, `w` tags, `wd`, `hg` attributes and their variants `mwd`, `mhg` attributes.


## How Does It Work?

You start with a wrapper of `v` or `h`. This wrapper has its intrinsic width and height set e.g. width and height 100% of the html body width and height.

```
<body>
	<v></v> <!-- width and height fill the entire browser viewport -->
</body>
```

Then you will add childNodes inside this wrapper. In this case of `v` layout, childNodes will distribute the height accordingly to the point that they stretch and covered all remaining space given by this wrapper. Rinse and repeat, you will soon find yourself building a complex layout easily.

## How to Use

You can checkout [`basic.html`](https://brucewangsg.github.io/flexapplayout/basic.html) example. All you need to do is to include:

- flex.css
	This CSS file is absolutely needed.  
	
- flex.init.js
	This is for custom tags enabler on older browser with some quirky behavior.
	
- flex.js
	If only CSS spec is getting a little more advanced that allows us to specify something like `width : calc(attr(wd))`, this js file will not be needed at all.


## Examples

Checkout a few examples on this project.

- [`basic.html`](https://brucewangsg.github.io/flexapplayout/basic.html) a real simple one to get the idea across.
- [`twocolumns.html`](https://brucewangsg.github.io/flexapplayout/twocolumns.html) as implied. ([not annotated](https://brucewangsg.github.io/flexapplayout/twocolumns.html?annotation=0))
- [`threecolumns.html`](https://brucewangsg.github.io/flexapplayout/threecolumns.html) as implied. ([not annotated](https://brucewangsg.github.io/flexapplayout/threecolumns.html?annotation=0))
- [`vertical.html`](https://brucewangsg.github.io/flexapplayout/vertical.html) simple vertically arranged stack. ([not annotated](https://brucewangsg.github.io/flexapplayout/vertical.html?annotation=0))
- [`horizontal.html`](https://brucewangsg.github.io/flexapplayout/horizontal.html) wait, isn't this the same as twocolumns example. ([not annotated](https://brucewangsg.github.io/flexapplayout/horizontal.html?annotation=0))
- [`horizontalonesidefixed.html`](https://brucewangsg.github.io/flexapplayout/horizontalonesidefixed.html) with sidebar of fixed width. ([not annotated](https://brucewangsg.github.io/flexapplayout/horizontalonesidefixed.html?annotation=0))
- [`grid.html`](https://brucewangsg.github.io/flexapplayout/grid.html) we have a sidebar here and 4 quadrants.
- [`nested.html`](https://brucewangsg.github.io/flexapplayout/nested.html) you can go wild sometimes.


# Bonus

## No JS

You don't feel like including additional flex.js file. Alrighty, but you have to do your own hardwork defining your fixed width/height childNodes. 

Checkout [`nojs.html`](https://brucewangsg.github.io/flexapplayout/nojs.html)

## No Custom Tags

You can replace `v` with `<div class='flex-v'></div>`, `h` with `<div class='flex-h'></div>`, and `w` with `<div class='flex-w'></div>`.

Checkout [`nojsandtag.html`](https://brucewangsg.github.io/flexapplayout/nojsandtag.html)

## No Custom Attributes

One more to go, similarly to No JS scenario, you might not like generic nameless width/height attribute mutators. Go creative with your own css selector naming. On for that you can simply use more concise `flex-ancient.css` file instead of more lines of codes `flex.css` file.

Checkout [`nojsandtagandattribute.html`](https://brucewangsg.github.io/flexapplayout/nojsandtagandattribute.html)

## Vue

Make it Vue compatible:

Checkout [`vue.html`](https://brucewangsg.github.io/flexapplayout/vue.html)

# Final Notes

We have been using this layout structure on [WireframeApp.io](https://wireframeapp.io/app) and [IconApp.io](https://iconapp.io/app). It's pretty much production ready for all browsers that support `display : flex`. You can always cross check with [caniuse.com](http://caniuse.com/#search=flex).

# License

This project falls under Open Course License. You can fork it and Open Source as your own, but remember to Open Course it.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. THE AUTHORS WISH THAT YOU HAVE FUN LEARNING ABOUT THIS PROJECT AND ENCOURAGE YOURSELF UNDERSTAND THE UNDERLYING CONCEPT BEHIND IT. WHEN THE TIME COME, YOU MIGHT BE ABLE TO EXPLAIN THE SAME CONCEPT TO OTHERS.
