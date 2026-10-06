module.exports = function (eleventyConfig) {
  // Assets estáticos (favicon, imágenes)
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Fecha legible en español: "5 de octubre de 2026"
  eleventyConfig.addFilter("fecha", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  });

  // Fecha ISO para <time datetime> y RSS
  eleventyConfig.addFilter("iso", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
  });

  // Año actual para el pie
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Posts ordenados del más reciente al más antiguo
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getAll().filter((item) => item.data.post === true)
      .sort((a, b) => b.date - a.date)
  );

  return {
    // GitHub Pages sirve este repo en https://cubasmx.github.io/blog/
    // En local (`npm start`) se fuerza la raíz con ELEVENTY_PATH_PREFIX=/
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/blog/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
