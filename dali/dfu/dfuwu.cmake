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


# Component: dfuwu 

#####################################################
# Description:
# ------------
#    Cmake Input File for dfuwu
#####################################################


project( dfuwu ) 

set (    SRCS 
         dfuwu.cpp 
    )

include_directories ( 
         ./../../common/remote 
         ./../../system/mp 
         ./../base 
         ./../../system/include 
         ./../../system/jlib 
         ./../../common/workunit 
         ./../../esp/clients/ws_dfsclient
         ${HPCC_SOURCE_DIR}/system/security/shared       #seclib.hpp
         )

HPCC_ADD_LIBRARY( dfuwu SHARED ${SRCS} )
set_target_properties ( dfuwu PROPERTIES 
        COMPILE_FLAGS "-D_USRDLL"
        DEFINE_SYMBOL DFUWU_EXPORTS
        )
install ( TARGETS dfuwu RUNTIME DESTINATION ${EXEC_DIR} LIBRARY DESTINATION ${LIB_DIR} )
target_link_libraries ( dfuwu 
         workunit
         jlib
         mp 
         hrpc 
         remote 
         dalibase 
         ws_dfsclient
    )

