# React, Browserify, Babel, Fetch, LevelDB

I would like to try React, Browserify, Babel, Fetch and LevelDB.
ES2015 and new Web Application development style has come.

## Usage

Clone this repository and run:
```
npm install
npm start
```

## Libraries

- `marked` instead of `showdown` because the latter isn't compatible with browserify.
- `whatwg-fetch` (the [proposed](https://fetch.spec.whatwg.org/) replacement for XHR) instead of $.ajax.

## Result

I particularly like how `fetch` and ES6 arrow functions transformed this:

```javascript
$.ajax({
  url: this.props.url,
  dataType: 'json',
  success: function(data) {
    this.setState({data: data});
  }.bind(this),
  error: function(xhr, status, err) {
    console.error(this.props.url, status, err.toString());
  }.bind(this)
});
```

...into this:
```javascript
fetch(this.props.url)
  .then(response => response.json())
  .then(data => this.setState({ data: data }))
  .catch(err => console.error(this.props.url, err.toString()))
```
