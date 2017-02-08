
import {languageString} from "../../language/language"

const STATUS = {
    NORMAL: languageString("{language.normal}",null),   //'正常',
    FAILURE: languageString("{language.failure}",null),  //'失效',
    TOCONFIRM: languageString("{language.toConfirm}",null), //'待确认'

    FREE: languageString("{language.free}",null),  //'空闲',
    OCCUPIED: languageString("{language.occupied}",null),  //'占用中',

    OPERABLE: languageString("{language.operable}",null), //'可操作',
    TOSUBMIT: languageString("{language.toSubmit}",null),   //'待提交',
    PROCESSING: languageString("{language.processing}",null), //'处理中',
    FINISH: languageString("{language.finish}",null), //'完成'
    
    START: languageString("{language.start}",null), //'开始'
    ORDER_PROCESSING: languageString("{language.orderProcessing}",null), //'订单处理'
    BUILD_ESOP_RESOURCES: languageString("{language.buildESOPResources}",null), //'生成ESOP资源'
    BUILD_SNMP_RESOURCES: languageString("{language.buildSNMPResources}",null), //'生成SNMP资源'
    BUILD_DPI_RESOURCES: languageString("{language.buildDPIResources}",null), //'生成DPI资源'
    CONFIRM_FLOW_COLLECTION: languageString("{language.confirmFlowCollection}",null), //'确认流量采集'
    FINISH_ARCHIVED: languageString("{language.finishArchived}",null), //'完成并归档'
    END: languageString("{language.end}",null), //'结束'
};

const CUSTOMER_STATUS = {
    1: STATUS.NORMAL,
    0: STATUS.FAILURE,
    9: STATUS.TOCONFIRM
};

const RESOURCE_STATUS = {
    1: STATUS.FREE,
    0: STATUS.FAILURE,
    2: STATUS.OCCUPIED
};

const ORDER_STATUS = {
    0: STATUS.OPERABLE,
    1: STATUS.TOSUBMIT,
    2: STATUS.FINISH, 
    3: STATUS.PROCESSING
};

const PROCESS_SNMP_STATUS = {
    100: STATUS.START,
    101: STATUS.ORDER_PROCESSING,
    102: STATUS.BUILD_ESOP_RESOURCES,
    201: STATUS.BUILD_SNMP_RESOURCES,
    210: STATUS.CONFIRM_FLOW_COLLECTION,
    310: STATUS.FINISH_ARCHIVED,
    400: STATUS.END
}

const PROCESS_DPI_STATUS = {
    100: STATUS.START,
    101: STATUS.ORDER_PROCESSING,
    102: STATUS.BUILD_ESOP_RESOURCES,
    202: STATUS.BUILD_DPI_RESOURCES,
    210: STATUS.CONFIRM_FLOW_COLLECTION,
    310: STATUS.FINISH_ARCHIVED,
    400: STATUS.END
}
export {CUSTOMER_STATUS, RESOURCE_STATUS, ORDER_STATUS, PROCESS_SNMP_STATUS, PROCESS_DPI_STATUS}