export class RouteNames {
    static login = 'login';
    static dashboard = 'dashboard';
    static appSettings = 'app-settings';
    static settings = 'settings';
    static genericSettings = 'settings/:model';
    static admin = 'admin';
    static users = 'users';
    static roles = 'roles';
    static reset = 'reset';

    static season = 'season';
    static seasonList = 'seasons';
    static seasonForm = 'seasons/form';
    static seasonFormEdit = 'seasons/form/:id';
    static seasonDetails = 'seasons/details';
    static seasonDetailsId = 'seasons/details/:id';

    static farmer = 'farmer';
    static farmerList = 'farmers';
    static farmerForm = 'farmers/form';
    static farmerFormEdit = 'farmers/form/:id';
    static farmerDetails = 'farmers/details';
    static farmerDetailsId = 'farmers/details/:id';
    static farmList = 'farms';
    static farmForm = 'farms/form';
    static farmFormEdit = 'farms/form/:id';
    static farmDetails = 'farms/details';
    static farmDetailsId = 'farms/details/:id';
    static farmMap = 'farmsmap';

    static service = 'service';




    static subscriber = 'subscriber';
    static subscriberList = 'subscribers';
    static subscriberForm = 'subscribers/form';
    static subscriberFormEdit = 'subscribers/form/:id';
    static subscriberDetails = 'subscribers/details';
    static subscriberDetailsId = 'subscribers/details/:id';

    static subscriberGroupList = 'groups';
    static subscriberGroupForm = 'groups/form';
    static subscriberGroupFormEdit = 'groups/form/:id';

    static subscriberImport = 'import';
    static subscriberExport = 'export';

    static content = 'content';
    static treeList = 'trees';
    static treeListForm = 'trees/form';
    static treeListDets = 'trees/details';
    static treeListDetails = 'trees/details/:id';
    // static treeStudio = 'trees/studio';
    // static treeStudiox = 'trees/studio/:id';
    static treeListFormEdit = 'trees/form/:id';
    static mediaLibrary = 'medialibrary';
    static mediaLibraryForm = 'medialibrary/form';
    static mediaLibraryDets = 'medialibrary/details';
    static mediaLibraryDetails = 'medialibrary/details/:id';
    static mediaLibraryFormEdit = 'medialibrary/form/:id';

    static defaultAudio = 'defaultaudio';
    static defaultAudioForm = 'defaultaudio/form';
    static defaultAudioDets = 'defaultaudio/details';
    static defaultAudioDetails = 'defaultaudio/details/:id';
    static defaultAudioFormEdit = 'defaultaudio/form/:id';

    /** Tree Builder Routes */
    static treeStudio = 'trees/studio';
    static treeStudioForm = 'trees/studio/:id';
    static treeStudioEdit = 'trees/studio/edit/:id';

    static campaign = 'campaign';
    static outbound = 'outbound';
    static outboundForm = 'outbound/form';
    static outboundFormEdit = 'outbound/form/:id';
    static schedules = 'schedules'
    static sform = 'form'
    static schedulesWithId = 'outbound/:id/schedules'
    static scheduleForm = 'outbound/:id/schedules/form'
    static scheduleFormEdit = 'outbound/:id/schedules/form/:sid'
    static outboundResults = 'outbound/results'
    static outboundResultsId = 'outbound/results/:id'
    static treeResults = 'tree/results'
    static treeResultsId = 'outbound/:id/tree/results/:tid'
    static treeNodeResponses = 'node-responses'
    static treeNodeResponsesId = 'outbound/:id/tree/results/:tid/node-responses/:key'

    static profile = 'profile';
    static profileForm = 'profile-form';
    static changePassword = 'change-password';

    static reports = 'reports'
}

export class Privileges {
    static CanViewDashboard = 'CanViewDashboard';
    static CanViewReports = 'CanViewReports';
    static CanViewSettings = 'CanViewSettings';
    static CanManageSettings = 'CanManageSettings';
    static CanViewAccounts = 'CanViewAccounts';
    static CanManageAccounts = 'CanManageAccounts';
    static CanViewFarmers = 'CanViewFarmers';
    static CanManageFarmers = 'CanManageFarmers';
    static CanViewFarms = 'CanViewFarms';
    static CanManageFarms = 'CanManageFarms';
    static CanViewSeasons = 'CanViewSeasons';
    static CanManageSeasons = 'CanManageSeasons';
    static CanViewRequests = 'CanViewRequests';
    static CanManageRequests = 'CanManageRequests';
    static CanViewServices = 'CanViewServices';
    static CanManageServices = 'CanManageServices';


    static CanViewSubscribers = 'CanViewSubscribers';
    static CanManageSubscribers = 'CanManageSubscribers';
    static CanUploadSubscribers = 'CanUploadSubscribers';
    static CanViewGroups = 'CanViewGroups';
    static CanManageGroups = 'CanManageGroups';
    static CanViewTrees = 'CanViewTrees';
    static CanManageTrees = 'CanManageTrees';
    static CanViewMedia = 'CanViewMedia';
    static CanManageMedia = 'CanManageMedia';
    static CanViewCampaigns = 'CanViewCampaigns';
    static CanManageCampaigns = 'CanManageCampaigns';
    static CanViewCampaignResults = 'CanViewCampaignResults';
    static CanViewSchedules = 'CanViewSchedules';
    static CanManageSchedules = 'CanManageSchedules';
    static CanViewContent = 'CanViewContent';
}
