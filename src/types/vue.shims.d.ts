declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module '*.png' {
    const _default: any
    export default _default
}

declare let cordova: any;
declare let process: any;

// ---------------------------------
// | Types
// ---------------------------------
declare namespace Types {
    interface Link {
        label: string
        link: string
    }
}

// ---------------------------------
// | Vuex State
// ---------------------------------
declare namespace State {
    interface Root {
        ecosystem: Types.Link[]
        essential: Types.Link[]
    }
}