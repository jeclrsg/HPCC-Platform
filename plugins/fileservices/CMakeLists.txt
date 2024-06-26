################################################################################
#    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems®.
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
################################################################################


# Component: fileservices 
#####################################################
# Description:
# ------------
#    Cmake Input File for fileservices
#####################################################

project( fileservices ) 
include(${HPCC_SOURCE_DIR}/esp/scm/smcscm.cmake)

set ( SRCS 
      ${ESPSCM_GENERATED_DIR}/ws_dfu_common_esp.cpp
      ${ESPSCM_GENERATED_DIR}/ws_dfu_esp.cpp 
      ${ESPSCM_GENERATED_DIR}/ws_fs_esp.cpp 
      fileservices.cpp 
      ${HPCC_SOURCE_DIR}/esp/bindings/bindutil.cpp 
      ${HPCC_SOURCE_DIR}/dali/dfuplus/dfuplus.cpp 
    )

include_directories ( 
         .
         ${HPCC_SOURCE_DIR}/common/deftype
         ${HPCC_SOURCE_DIR}/common/environment
         ${HPCC_SOURCE_DIR}/common/remote
         ${HPCC_SOURCE_DIR}/common/thorhelper
         ${HPCC_SOURCE_DIR}/common/workunit
         ${HPCC_SOURCE_DIR}/dali/ft
         ${HPCC_SOURCE_DIR}/dali/base
         ${HPCC_SOURCE_DIR}/dali/dfu
         ${HPCC_SOURCE_DIR}/dali/dfuplus
         ${HPCC_SOURCE_DIR}/ecl/eclagent
         ${HPCC_SOURCE_DIR}/esp/bindings
         ${HPCC_SOURCE_DIR}/esp/bindings/SOAP/xpp
         ${HPCC_SOURCE_DIR}/esp/clients
         ${HPCC_SOURCE_DIR}/esp/clients/ws_dfsclient
         ${HPCC_SOURCE_DIR}/esp/platform
         ${HPCC_SOURCE_DIR}/rtl/include
         ${HPCC_SOURCE_DIR}/rtl/eclrtl
         ${HPCC_SOURCE_DIR}/system/include
         ${HPCC_SOURCE_DIR}/system/jhtree
         ${HPCC_SOURCE_DIR}/system/jlib
         ${HPCC_SOURCE_DIR}/system/mp
         ${HPCC_SOURCE_DIR}/system/security/shared
         ${HPCC_SOURCE_DIR}/system/xmllib
            )

ADD_DEFINITIONS( -D_USRDLL -DFILESERVICES_EXPORTS -DWSDFU_API_LOCAL -DFileSpray_API_LOCAL )

HPCC_ADD_LIBRARY( fileservices SHARED ${SRCS} )  
add_dependencies ( fileservices espscm )
install ( TARGETS fileservices DESTINATION plugins )
target_link_libraries ( fileservices
         deftype
         dalibase
         dllserver
         esphttp
         eclrtl
         jlib
         nbcd
         remote
         workunit
         ws_dfsclient
    )

if (NOT CONTAINERIZED)
    target_link_libraries ( fileservices environment )
endif()

