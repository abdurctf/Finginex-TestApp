// CODESHARKS Config for cScanTWAIN
// Scan to Web - Native Javascript & cScanTWAIN Companion Application
// Copyright 2021-2022, CODESHARKS
// Author: CODESHARKS
// Version: 1.3.1
//
let CSHARKS = {CSHARKS: {}};

/////////////////////////////////////////////////////////////////////////////////////
//  WARNING:  The productKey in this file is protected by copyright law            //
//  and international treaty provisions. Unauthorized reproduction or              //
//  distribution of this productKey, or any portion of it, may result in severe    //
//  criminal and civil penalties, and will be prosecuted to the maximum            //
//  extent possible under the law.  Further, you may not reverse engineer,         //
//  decompile, disassemble, or modify the productKey .
/////////////////////////////////////////////////////////////////////////////////////
CSHARKS.PRODUCT_KEY = "TRIAL";

/////////////////////////////////////////////////////////////////////////////////////
// Required Settings                                                               //
/////////////////////////////////////////////////////////////////////////////////////

// LISTENING PORT - This normally does not need to be changed unless you have a port conflict
// Port that cScanTWAIN.exe application is listening on.
// If changed from the default 26813, then the cScanTWAIN.exe application must include a
// cScanTWAIN.ini file with the new port, otherwise no .ini file is required.
// Sample cScanTWAIN.ini entry:
// [SYSTEM]
// PORT=28855
CSHARKS.CSCAN_PORT = 26813;

// UPLOAD URL
// You can override this setting in your pages javascript to dynamically change the upload URL
// Our recommendation is to have a generic upload backend and identify your uploaded content
// by overriding the CSCAN_UPLOAD_PREFIX setting during your javascript ready event.
CSHARKS.CSCAN_UPLOAD_URL = "https://acme.com/cscan/upload";

// UPLOAD FILENAME PREFIX
// The resulting post variable during upload will be prefixed with this setting.  You can override
// this setting in your pages javascript which allows you to have a generic upload backend while
// being able to identify the data being uploaded.
// File Naming Convention: CSHARKS.CSCAN_UPLOAD_PREFIX + cscan_img_pageNumber
// Example POST request: DEMO_cscan_img_1
CSHARKS.CSCAN_UPLOAD_PREFIX = "DEMO_";

// UPLOAD IMMEDIATELY AFTER IMAGE ACQUISITION
// When TRUE, uploads will occur immediately after a scan operation has completed.
// If you set this to TRUE then you likely will set CSHARKS.CSCAN_DELETE_AFTER_UPLOAD to TRUE
// in order to prevent the user from uploading the same scan more than once.
CSHARKS.CSCAN_UPLOAD_IMMEDIATELY = false;

// DELETE AFTER UPLOAD
// Delete Scanned Images from the viewer after upload.
// This setting is ignored when CSHARKS.CSCAN_CLOSE_AFTER_UPLOAD is TRUE because all images
// are deleted from the image viewer when the dialog is closed.
CSHARKS.CSCAN_DELETE_AFTER_UPLOAD = true;

// CLOSE SCAN DIALOG AFTER UPLOAD COMPLETE
CSHARKS.CSCAN_CLOSE_AFTER_UPLOAD = false;


/////////////////////////////////////////////////////////////////////////////////////
// Required Scanner Settings                                                       //
/////////////////////////////////////////////////////////////////////////////////////

// PIXEL TYPE
// Filesize can be impacted by different settings.
// (BW) Black & white (1 bit depth)
// (GRAY) Gray scale (8 bit depth)
// (RGB) Full RGB (24 bit depth)
CSHARKS.CSCAN_SCANNER_PIXELTYPE = "GRAY";

// DPI - Dots Per Inch
CSHARKS.CSCAN_SCANNER_DPI = 150;

// SHOW DEVICE DRIVER UI - Show the default device driver user interface
// This provides the end user with the most control over the scanning device as possible.
// If true, the cScanTWAIN interface settings button for brightness/contrast/ADF feeder will
// not be available, simply because these settings can be overwritten by the scanners default
// UI interface.
CSHARKS.CSCAN_SCANNER_SHOWUI = false;

/////////////////////////////////////////////////////////////////////////////////////
// Optional Settings                                                               //
// Below are optional components of cscanConfig.js                                //
// If you do not want it displayed then comment it out.                            //
/////////////////////////////////////////////////////////////////////////////////////

// APPLICATION DOWNLOAD
// Allow the companion application to be downloaded by the user.
// Place the cScanTWAIN.exe application on your web server in an accessible location of your choice.
CSHARKS.CSCAN_DOWNLOAD_LINK = "/lib/cScan/cScanTWAIN.exe";

// NOTICE OF CONTACT
CSHARKS.CSCAN_ADMIN_NOTICE = "If you need assistance then please contact your system Administrator.";

