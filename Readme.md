# Background

Gone are the days we used to use HTML tables to define a simple grid layout for our webpages. Latest CSS specifications are getting more refined to the point that it is now possible to define a complex layout with a simple markup structure. Back in the days when a minimalist markup structure for a 3-column layout was really hard to achieve whenever padding was introduced or a background was required to stretch to the height across those columns. Subsequently `-webkit-box-sizing` css attribute was introduced, that took away the padding complexity out of the equation by turning back the clock, which essentially remodeled the old box layout metaphor into the IE6-like box model. 

For this simple experiment, I want to put `display : flex` css attribute to good use. I wanted a simple markup structure that could easily define my app layout in a minimalistic, crystal clear and straightforward way. The simplicity will cut down some slack hunting for those width/height units defined somewhere deep inside our commonly shared global css.

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

I'm introducing 3 custom html tags: `v`, `h`, and `w`. Those are the shortest tags I can get down to because `v-box` and `h-box` simply don't sound cool at all.   

- `v` is a wrapper where all childNodes inside it will fill up the space in the `column` direction (`flex-direction : column`). This is pretty similar when you have one `div` after another. The next `div` will fill the next row space. The sum of heights for all the childNodes will be equal to the height of this wrapper. 

- `h` is a wrapper where all childNodes inside it will fill up the space in the `row` direction (`flex-direction : row`). This is pretty similar when you have `float : left` divs. The next `div` will fill the space on the right of the previous div. The sum of widths for all the childNodes will be equal to the width of this wrapper. 

- `w` will be just a plain vanilla wrapper that goes along with `v`, `h` parentNode. This wrapper won't modify how its childNodes should be laid out. They will simply fallback to their default browser flow layout depending on what childNodes are inside it (e.g. display: block div, or display: inline-block tabs etc).


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

It's a total authoritarian to have all the columns/rows set to the same width or height. Let's say I just want my sidebar to stick with 320px while the next column(s) can distribute the remaining width equally. 

In such a case, you can do as follow:

```
<h>
  <w class='cc-sidebar' wd='320' style='background:#eee'></w>
  <w></w>
</h>

```

Introducing `wd`, `hg`, `mwd`, `mhg` attributes.

- `wd` is for width, it will force that element to have an arbitrary fix width specified in the attribute.
- `hg` is for height, similarly this will set the fix height.
- `mwd` is width that only applies when your display is in mobile screen format i.e. screenWidth <= 600.
- `mhg` is height that only applies when your display is in mobile screen format i.e. screenWidth <= 600.

For some mobile screen scenarios, you might want your 2-column layout to turn into a single column layout by hiding the sidebar. 

You can do this:

```
<h>
  <w class='cc-sidebar' wd='320' mwd='0' style='background:#eee'></w>
  <w></w>
</h>

```

That was easy, wasn't it? All you have to remember is `v`, `h`, `w` tags, `wd`, `hg` attributes and their variants `mwd`, `mhg` attributes.


## How Does It Work?

You start with a wrapper of `v` or `h`. This wrapper has its intrinsic width and height set e.g. width and height 100% of the html body width and height.

```
<body>
  <v></v> <!-- width and height fill the entire browser viewport -->
</body>
```

Then you will add childNodes inside this wrapper. In this case of `v` layout, childNodes will distribute the height accordingly to the point that they stretch and cover all remaining space given by this wrapper. Rinse and repeat, you will soon find yourself building a complex layout easily.

## How to Use

You can checkout [`basic.html`](https://brucewangsg.github.io/flexapplayout/basic.html) as an example. All you need to do is to include:

- [flex.css](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/stylesheets/flex.css)
	This CSS file is absolutely needed.  
	
- [flex.init.js](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/javascripts/flex.init.js)
	This is for custom tags enabler on older browsers with quirky behaviors.
	
- [flex.js](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/javascripts/flex.js)
	If only CSS spec is getting a little more advanced that allows us to specify something like `width : calc(attr(wd))`, this js file will not be needed at all.


## Examples

Checkout a few examples on this project.

- [`basic.html`](https://brucewangsg.github.io/flexapplayout/basic.html) a real simple one to get the idea across. ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/basic.html))
- [`twocolumns.html`](https://brucewangsg.github.io/flexapplayout/twocolumns.html) as implied. ([not annotated](https://brucewangsg.github.io/flexapplayout/twocolumns.html?annotation=0)) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/twocolumns.html))
- [`threecolumns.html`](https://brucewangsg.github.io/flexapplayout/threecolumns.html) as implied. ([not annotated](https://brucewangsg.github.io/flexapplayout/threecolumns.html?annotation=0)) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/threecolumns.html))
- [`vertical.html`](https://brucewangsg.github.io/flexapplayout/vertical.html) simple vertically arranged stack. ([not annotated](https://brucewangsg.github.io/flexapplayout/vertical.html?annotation=0)) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/vertical.html))
- [`horizontal.html`](https://brucewangsg.github.io/flexapplayout/horizontal.html) wait, isn't this the same as twocolumns.html example. ([not annotated](https://brucewangsg.github.io/flexapplayout/horizontal.html?annotation=0)) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/horizontal.html))
- [`horizontalonesidefixed.html`](https://brucewangsg.github.io/flexapplayout/horizontalonesidefixed.html) with sidebar of fixed width. ([not annotated](https://brucewangsg.github.io/flexapplayout/horizontalonesidefixed.html?annotation=0)) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/horizontalonesidefixed.html))
- [`grid.html`](https://brucewangsg.github.io/flexapplayout/grid.html) we have a sidebar here and 4 quadrants. ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/grid.html))
- [`nested.html`](https://brucewangsg.github.io/flexapplayout/nested.html) you can go wild sometimes. ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/nested.html))
- [`adminlayout.html`](https://brucewangsg.github.io/flexapplayout/adminlayout.html) simple admin page layout with a sidebar. ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/adminlayout.html))


# Bonus

## No JS

You might not feel like including additional [`flex.js`](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/javascripts/flex.js) file. Alrighty, but you would have to do your own hardwork by defining your fixed width/height childNodes. 

Checkout [`nojs.html`](https://brucewangsg.github.io/flexapplayout/nojs.html) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/nojs.html))

## No Custom Tags

You can replace `v` with `<div class='flex-v'></div>`, `h` with `<div class='flex-h'></div>`, and `w` with `<div class='flex-w'></div>`.

Checkout [`nojsandtag.html`](https://brucewangsg.github.io/flexapplayout/nojsandtag.html) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/nojsandtag.html))


## No Custom Attributes

One more to go, similarly to the No JS scenario, you might not like generic nameless width/height attribute mutators. Go creative with your own css selector naming. For that you can simply use the more concised [`flex-ancient.css`](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/stylesheets/flex-ancient.css) file instead of the [`flex.css`](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/stylesheets/flex.css) file which has more lines of codes.

Checkout [`nojsandtagandattribute.html`](https://brucewangsg.github.io/flexapplayout/nojsandtagandattribute.html) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/nojsandtagandattribute.html))

## Vue

Make it Vue compatible:

Checkout [`vue.html`](https://brucewangsg.github.io/flexapplayout/vue.html) ([Source](https://raw.githubusercontent.com/brucewangsg/flexapplayout/master/vue.html))

# Final Notes

We have been using this layout structure on [WireframeApp.io](https://wireframeapp.io/app) and [IconApp.io](https://iconapp.io/app). It's pretty much in production ready for all browsers that support `display : flex`. You can always cross check with [caniuse.com](http://caniuse.com/#search=flex).

# License

This project falls under Open Course License. You can fork it and Open Source as your own, but remember to Open Course it.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. THE AUTHORS WISH THAT YOU HAVE FUN LEARNING ABOUT THIS PROJECT AND THAT YOU WOULD ENCOURAGE YOURSELF TO UNDERSTAND THE UNDERLYING CONCEPT BEHIND IT. WHEN THE TIME COMES, YOU MIGHT BE ABLE TO EXPLAIN THE SAME CONCEPT TO OTHERS.
