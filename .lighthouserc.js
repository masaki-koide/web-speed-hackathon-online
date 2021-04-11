module.exports = {
  ci: {
    collect: {
      // トップ、ブログ、記事、404
      url: [
        'http://localhost/',
        'http://localhost/b0000',
        'http://localhost/b0000/entry/e0000',
        'http://localhost/hoge/404'
      ],
      staticDistDir: './dist',
      isSinglePageApplication: true
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://safe-wildwood-52020.herokuapp.com',
      token: process.env.LHCI_BUILD_TOKEN
    },
  },
};
