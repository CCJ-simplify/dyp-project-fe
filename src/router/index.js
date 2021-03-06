import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
				{
					path: '/console',
					component: () => import( '../components/page/console.vue' ),
					meta: {title:'电影票工作台'}
				},
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/SupperAdmin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/SupperAdmin.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/Setting',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Setting.vue'),
                    meta: { title: '系统首页' }
                },
								{
                    path: '/Settings',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Settings.vue'),
                    meta: { title: '系统设置' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/customer',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/customer.vue'),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/WechatCustomer',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/WechatCustomer.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/order',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/order.vue'),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/space',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Space.vue'),
                    meta: { title: '场地管理' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
								{
								    // 富文本编辑器组件
								    path: '/movie',
								    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Movie.vue'),
								    meta: { title: '电影管理' }
								},
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
								{
								    // markdown组件
								    path: '/PSpace',
								    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/PSpace.vue'),
								    meta: { title: '场地编排' }
								},
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // 图片上传组件
                    path: '/YYInfo',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/YYInfo.vue'),
                    meta: { title: '影院信息' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: '电影统计' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
						meta: {title: '电影票管理系统'}
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
