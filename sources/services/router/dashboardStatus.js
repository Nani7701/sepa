"use strict";

import {getDashboardStatus, postDashboardStatus, patchDashboardStatus} from '../controller/dashboardStatus';
import { isTokenValid } from './interceptor'

router.patch('/service/status',isTokenValid, patchDashboardStatus);
router.post('/service/statusInsert',isTokenValid, postDashboardStatus);
router.get('/service/status',isTokenValid, getDashboardStatus);

module.exports = router;