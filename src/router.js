import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const APP_ROUTE = '/app';

const routes = [
    {
        path: "/",
        redirect: `${APP_ROUTE}`,
    },
    {
        path: `${APP_ROUTE}`,
        //component: () => import("./views/app"),
        component: () => import("./App"),
        redirect: `${APP_ROUTE}/my-jobs`,
        children: [
            {
                path: "login",
                component: () => import("./views/app/LoginKeycloak"),
            },
            {
              path: "new-job",
              component: () => import("./views/app/jobs/NewJob"),
            },
            {
                path: "my-jobs",
                name: "my-jobs",
                component: () => import("./views/app/jobs/MyJobs"),
            },
            {
                path: "unassigned-jobs",
                component: () => import("./views/app/jobs/UnassignedJobs"),
                beforeEnter: (to, from, next) => {
                    next((store.getters.userIsWorker || store.getters.userIsAdmin) ? {} : '/')
                }
            },
            {
                path: "job-categories",
                component: () => import("./views/app/jobCategories/JobCategories"),
            },
            {
                path: "settings",
                component: () => import("./views/app/user/UserSettings"),
            },
            {
                path: "token",
                component: () => import("./views/app/token/TokenData"),
            },
        ]
    },
    {
        path: "*",
        component: () => import("./views/NotFoundError")
    }
];

const router = new VueRouter({
    linkActiveClass: "active",
    routes,
    mode: "history"
});

/*router.beforeEach((to, from, next) => {
    if (!Vue.$keycloak.authenticated) {
        Vue.$keycloak.login();
    }

    if (to.name === "unassigned-jobs" && (this.$store.getters.userIsAdmin || this.$store.getters.userIsWorker )) {
        next();
    } else {
        next('/');
    }
})*/

export default router;