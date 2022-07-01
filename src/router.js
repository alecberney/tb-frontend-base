import Vue from "vue";
import VueRouter from "vue-router";

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
                //beforeEnter: () => { return true }
                // TODO: verify it's admin or worker
            },
            {
                path: "job-categories",
                component: () => import("./views/app/jobCategories/JobCategories"),
            },
            {
                path: "settings",
                component: () => import("./views/app/user/UserSettings"),
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

export default router;