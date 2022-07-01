import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const APP_ROUTE = '/app';

const routes = [
    {
        path: "/",
        redirect: `${APP_ROUTE}`,
    },
    {
        path: `${APP_ROUTE}`,
        component: () => import("../App"),
        redirect: `${APP_ROUTE}/my-jobs`,
        children: [
            {
              path: "new-job",
              component: () => import("../views/app/jobs/NewJob"),
            },
            {
                path: "my-jobs",
                name: "my-jobs",
                component: () => import("../views/app/jobs/MyJobs"),
            },
            {
                path: "unassigned-jobs",
                component: () => import("../views/app/jobs/UnassignedJobs"),
                /*beforeEnter: (to, from, next) => {
                    next((store.getters.userIsWorker || store.getters.userIsAdmin) ? {} : '/');
                }*/
            },
            {
                path: "job-categories",
                component: () => import("../views/app/jobCategories/JobCategories"),
            },
            {
                path: "settings",
                component: () => import("../views/app/user/UserSettings"),
            },
            {
                path: "token",
                component: () => import("../views/app/token/TokenData"),
            },
        ]
    },
    {
        path: "*",
        component: () => import("../views/NotFoundError")
    }
];

const index = new VueRouter({
    linkActiveClass: "active",
    routes,
    mode: "history"
});

// Doesn't work
const WORKER_PROTECTED_ROUTES = [
    "unassigned-jobs"
]

index.beforeEach((to, from, next) => {
    /*if (to.name === "login") {
        next();
    }

    if (store.getters.getUser == null) {
        console.log('need to connect');
        next({name: '/app/login'});
    }*/

    if (store.getters.userIsAdmin) {
        next();
    }

    if (WORKER_PROTECTED_ROUTES.includes(to.name) && store.getters.userIsWorker) {
        next();
    } else {
        next({name: '/'});
    }
})

export default index;