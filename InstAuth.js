if (window.opener)
  if (window.opener.instagramClientId)
    if (window.location.href.search("instagram_auth") > -1 && -1 === window.location.href.search("error") && -1 === window.location.hash.search("access_token")) window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=" + window.opener.instagramClientId + "&response_type=token&redirect_uri=" + window.location.href;
    else {
      if (window.location.hash.search("access_token") > -1) {
        var access_token = {
          access_token: window.location.hash.substr(14).split("&")[0]
        };
        window.opener.postMessage(JSON.stringify(access_token), window.opener.location.href)
      } else window.location.href.search("error") > -1 ? window.opener.postMessage("The user denied request.", window.opener.location.href) : window.opener.postMessage("Unexpected error occurred.", window.opener.location.href);
      window.close()
    }
  else console.error("You forgot to set Instagram client_id.");
else if (window.frameElement && window.frameElement.id && "instagramAuthFrame" === window.frameElement.id)
  if (window.parent.document.getElementById("instagramAuthFrame").src = "about:blank", window.parent.instagramClientId)
    if (window.location.href.search("instagram_auth") > -1 && -1 === window.location.href.search("error") && -1 === window.location.hash.search("access_token")) window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=" + window.parent.instagramClientId + "&response_type=token&redirect_uri=" + window.location.href;
    else if (window.location.hash.search("access_token") > -1) {
      access_token = {
        access_token: window.location.hash.substr(14).split("&")[0]
      };
      window.parent.postMessage(JSON.stringify(access_token), window.parent.location.href)
    } else window.location.href.search("error") > -1 ? window.parent.postMessage("The user denied request.", window.parent.location.href) : window.parent.postMessage("Unexpected error occurred.", window.parent.location.href);
  else console.error("You forgot to set Instagram client_id.");
else InstAuth = {
    _w: window.screen.width / 3,
    _h: window.screen.height / 2,
    _USER_DENIED_REQUEST: "The user denied request.",
    _UNEXPECTED_ERROR: "Unexpected error occurred.",
    init: function(e) {
      this.clientId = e, window.instagramClientId = e, this._buildIframe()
    },
    getAccessToken: function() {
      return this.accessToken || "There is no access_token available. You must use startAuthFlow() to get one."
    },
    _buildIframe: function() {
      this._startListening();
      var e = window.document.createElement("iframe");
      e.setAttribute("src", window.location.href + "instagram_auth"), e.setAttribute("id", "instagramAuthFrame"), e.style.width = "1px", e.style.height = "1px", e.style.position = "fixed", e.style.top = "0", e.style.right = "0", e.style.opacity = "0", e.style.visibility = "none", e.onload = function() {
        try {
          window.parent.document.getElementById("instagramAuthFrame").contentDocument
        } catch (e) {
          InstAuth._removeIframe()
        }
      }, window.document.body.appendChild(e)
    },
    startAuthFlow: function() {
      if (window.instagramClientId || this.clientId) {
        this._startListening();
        var e = window.screen.width / 2 - this._w / 2,
          t = window.screen.height / 2 - this._h / 2;
        window.open(window.location.href + "instagram_auth", "name", "resizable,scrollbars,width=" + this._w + ",height=" + this._h + ",left=" + e + ",top=" + t)
      } else console.error("You forgot to call Insta.init() with your client_id.")
    },
    _startListening: function() {
      window.addEventListener("message", this._receiveMessage)
    },
    _removeIframe: function() {
      var e = window.parent.document.getElementById("instagramAuthFrame");
      e && e.parentNode && e.parentNode.removeChild(e)
    },
    _receiveMessage: function(e) {
      switch (e.data) {
        case InstAuth._USER_DENIED_REQUEST:
        case InstAuth._UNEXPECTED_ERROR:
          console.error(e.data || InstAuth._UNEXPECTED_ERROR), window.parent && InstAuth._removeIframe(), window.removeEventListener("message", this._receiveMessage);
          break;
        default:
          "string" === typeof e.data && e.data.search("access_token") > -1 && (InstAuth.accessToken = JSON.parse(e.data).access_token, window.instagramAccessToken = InstAuth.accessToken, window.parent && InstAuth._removeIframe(), window.removeEventListener("message", this._receiveMessage), console.warn("Instagram access_token: " + InstAuth.accessToken))
      }
    }
  };