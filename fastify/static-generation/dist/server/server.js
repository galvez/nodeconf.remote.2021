"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var vueRouter = require("vue-router");
var head = require("@vueuse/head");
var serverRenderer = require("vue/server-renderer");
var client = require("fastify-vite-vue/client");
var fetchUndici = require("fetch-undici");
var app = require("fastify-vite-vue/app");
var server$1 = require("fastify-vite-vue/server");
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, {
    default: vue.withCtx(({ Component }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        serverRenderer.ssrRenderSuspense(_push2, {
          default: () => {
            serverRenderer.ssrRenderVNode(_push2, vue.createVNode(vue.resolveDynamicComponent(Component), {
              key: _ctx.$route.path
            }, null), _parent2, _scopeId);
          },
          _: 2
        });
      } else {
        return [
          (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component), {
                key: _ctx.$route.path
              }))
            ]),
            _: 2
          }, 1024))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("base.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var base = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
var style_css_vue_type_style_index_0_src_lang = "";
const path$1 = "/";
async function getPayload$1() {
  const response = await fetchUndici.fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = response.json();
  return posts;
}
const _sfc_main$1 = {
  async setup() {
    const { $payload } = await client.useHydration({ getPayload: getPayload$1 });
    return { posts: $payload };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");
  _push(`<section${serverRenderer.ssrRenderAttrs(_attrs)}><h1>Posts</h1><!--[-->`);
  serverRenderer.ssrRenderList($setup.posts, (post2) => {
    _push(`<article><h2>`);
    _push(serverRenderer.ssrRenderComponent(_component_router_link, {
      to: `/posts/${post2.id}`
    }, {
      default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.ssrInterpolate(post2.title)}`);
        } else {
          return [
            vue.createTextVNode(vue.toDisplayString(post2.title), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</h2></article>`);
  });
  _push(`<!--]--></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("views/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var index = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
var __glob_1_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  path: path$1,
  getPayload: getPayload$1,
  "default": index
});
const path = "/posts/:id";
async function getPayload({ req }) {
  const id = req.params.id;
  const response = await fetchUndici.fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post2 = await response.json();
  return { post: post2 };
}
const _sfc_main = {
  async setup() {
    const { $payload } = await client.useHydration({ getPayload });
    return $payload;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${serverRenderer.ssrRenderAttrs(_attrs)}><article><h1>${serverRenderer.ssrInterpolate(_ctx.post.title)}</h1><div>${_ctx.post.body}</div></article></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("views/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var post = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var __glob_1_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  path,
  getPayload,
  "default": post
});
var routes = app.loadRoutes({ "./views/index.vue": __glob_1_0, "./views/post.vue": __glob_1_1 });
function createApp(ctx) {
  const app2 = vue.createSSRApp(base);
  const head$1 = head.createHead();
  const history = vueRouter.createMemoryHistory();
  const router = vueRouter.createRouter({ history, routes });
  app2.use(router);
  app2.use(head$1);
  return { ctx, app: app2, head: head$1, router };
}
var server = {
  routes,
  render: server$1.createRenderFunction(createApp)
};
exports["default"] = server;
