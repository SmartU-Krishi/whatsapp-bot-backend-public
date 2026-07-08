module.exports = function setLanguage(req, res, next) {
  const headerLang = req.headers["lang"] || req.headers["accept-language"];
  
  // Extract just the language code like 'en', 'hi', 'mr' from header
  let lang = headerLang?.slice(0, 2).toLowerCase() || "en";

  const supported = ["en", "hi", "mr", "gj"];
  req.lang = supported.includes(lang) ? lang : "en";

  next();
};
