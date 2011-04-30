(function() {
  var app, bayeux, express, faye, port;
  express = require('express');
  faye = require('faye');
  bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
  });
  app = express.createServer();
  app.configure(function() {
    app.use(express.logger());
    app.use(express.bodyParser());
    return app.use(express.static("" + (__dirname) + "/public"));
  });
  app.post('/lance', function(req, res) {
    if (req.param('token') !== 'abc') {
      res.send(403);
      return null;
    }
    bayeux.getClient().publish('/temporeal', {
      equipe: req.body.equipe,
      texto: req.body.texto
    });
    return res.send(200);
  });
  port = process.env.PORT || "8000";
  bayeux.attach(app);
  app.listen(port);
}).call(this);
