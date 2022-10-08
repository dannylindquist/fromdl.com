const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('short', function(value) {
    return value.toLocaleDateString('default');
  });

  eleventyConfig.addFilter('niceDate', function(value) {
    /** @type {Date} value */
    const dateValue = value;
    return dateValue.toLocaleDateString('default', {
      month: 'long',
      year: 'numeric',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter('json', function(value) {
    return JSON.stringify(value, null, 2)
  })
  
  return {
    dir: { 
      input: './src'
    }
  }
}