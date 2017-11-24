#################################################
# IxLoad ScriptGen created script
# Test1 serialized using version 8.10.0.300
# sample_ixload_final_http.tcl made on May 05 2017 12:29
#################################################


#################################################
# Copy content of setup_ixload_paths.tcl
#################################################

source setup_ixload_paths.tcl

package require IxLoad

::IxLoad connect 1.2.3.4

#set ip  [lindex $argv 1]

if [catch {

package require statCollectorUtils
set scu_version [package require statCollectorUtils]
puts "statCollectorUtils package version = $scu_version"

set logtag "IxLoad-api"
set logName "sample_ixload_final_http"
set logger [::IxLoad new ixLogger $logtag 1]
set logEngine [$logger getEngine]
$logEngine setLevels $::ixLogger(kLevelDebug) $::ixLogger(kLevelInfo)
$logEngine setFile $logName 2 256 1

global ixAppPluginManager
$ixAppPluginManager load "HTTP"

#################################################
# Build chassis chain
#################################################
set chassisChain [::IxLoad new ixChassisChain]

$chassisChain addChassis 192.168.31.42

set Test1 [::IxLoad new ixTest]

set scenarioElementFactory [$Test1 getScenarioElementFactory]

set scenarioFactory [$Test1 getScenarioFactory]

#################################################
# Profile Directory
#################################################
set profileDirectory [$Test1 cget -profileDirectory]

set my_ixEventHandlerSettings [::IxLoad new ixEventHandlerSettings]

$my_ixEventHandlerSettings config \
	-disabledEventClasses                    "" \
	-disabledPorts                           "" 

set my_ixViewOptions [::IxLoad new ixViewOptions]

$my_ixViewOptions config \
	-runMode                                 1 \
	-captureRunDuration                      0 \
	-captureRunAfter                         0 \
	-collectScheme                           0 \
	-allocatedBufferMemoryPercentage         30 

$Test1 scenarioList.clear

set Scenario1 [$scenarioFactory create "Scenario"]

$Scenario1 columnList.clear

set Originate [::IxLoad new ixTrafficColumn]

$Originate elementList.clear

#################################################
# Create ScenarioElement kNetTraffic
#################################################
set Traffic1_Network1 [$scenarioElementFactory create $::ixScenarioElementType(kNetTraffic)]



#################################################
# Network Network1 of NetTraffic Traffic1@Network1
#################################################
set Network1 [$Traffic1_Network1 cget -network]

$Network1 portList.appendItem \
	-chassisId                               1 \
	-cardId                                  1 \
	-portId                                  9 

$Network1 globalPlugins.clear



set Settings_13 [::IxLoad new ixNetIxLoadSettingsPlugin]

# ixNet objects need to be added in the list before they are configured!
$Network1 globalPlugins.appendItem -object $Settings_13



$Settings_13 config \
	-teardownInterfaceWithUser               false \
	-_Stale                                  false \
	-interfaceBehavior                       0 

set Filter_13 [::IxLoad new ixNetFilterPlugin]

# ixNet objects need to be added in the list before they are configured!
$Network1 globalPlugins.appendItem -object $Filter_13



$Filter_13 config \
	-all                                     false \
	-pppoecontrol                            false \
	-isis                                    false \
	-auto                                    true \
	-udp                                     "" \
	-tcp                                     "" \
	-mac                                     "" \
	-_Stale                                  false \
	-pppoenetwork                            false \
	-ip                                      "" \
	-icmp                                    "" 

set GratARP_13 [::IxLoad new ixNetGratArpPlugin]

# ixNet objects need to be added in the list before they are configured!
$Network1 globalPlugins.appendItem -object $GratARP_13



$GratARP_13 config \
	-forwardGratArp                          false \
	-enabled                                 true \
	-maxFramesPerSecond                      0 \
	-_Stale                                  false \
	-rateControlEnabled                      false 

set TCP_13 [::IxLoad new ixNetTCPPlugin]

# ixNet objects need to be added in the list before they are configured!
$Network1 globalPlugins.appendItem -object $TCP_13



$TCP_13 config \
	-tcp_bic                                 0 \
	-tcp_tw_recycle                          true \
	-tcp_retries2                            5 \
	-disable_min_max_buffer_size             true \
	-tcp_retries1                            3 \
	-tcp_keepalive_time                      7200 \
	-tcp_mgmt_rmem                           87380 \
	-tcp_rfc1337                             false \
	-tcp_ipfrag_time                         30 \
	-tcp_rto_max                             120000 \
	-tcp_window_scaling                      false \
	-adjust_tcp_buffers                      true \
	-udp_port_randomization                  false \
	-tcp_vegas_alpha                         2 \
	-tcp_vegas_beta                          6 \
	-tcp_wmem_max                            262144 \
	-tcp_ecn                                 false \
	-tcp_westwood                            0 \
	-tcp_rto_min                             200 \
	-delayed_acks_segments                   0 \
	-tcp_vegas_cong_avoid                    0 \
	-tcp_keepalive_intvl                     75 \
	-tcp_rmem_max                            262144 \
	-tcp_orphan_retries                      0 \
	-bestPerfSettings                        false \
	-tcp_max_tw_buckets                      180000 \
	-_Stale                                  false \
	-tcp_low_latency                         0 \
	-tcp_rmem_min                            4096 \
	-accept_ra_all                           false \
	-tcp_adv_win_scale                       2 \
	-tcp_wmem_default                        4096 \
	-tcp_wmem_min                            4096 \
	-tcp_port_min                            1024 \
	-tcp_stdurg                              false \
	-tcp_port_max                            65535 \
	-tcp_fin_timeout                         60 \
	-tcp_no_metrics_save                     false \
	-tcp_dsack                               true \
	-tcp_mgmt_wmem                           32768 \
	-tcp_abort_on_overflow                   false \
	-tcp_frto                                0 \
	-tcp_mem_pressure                        32768 \
	-tcp_app_win                             31 \
	-ip_no_pmtu_disc                         true \
	-llm_hdr_gap                             8 \
	-tcp_max_orphans                         8192 \
	-accept_ra_default                       false \
	-tcp_syn_retries                         5 \
	-tcp_moderate_rcvbuf                     0 \
	-tcp_max_syn_backlog                     1024 \
	-tcp_mem_low                             24576 \
	-tcp_tw_rfc1323_strict                   false \
	-tcp_fack                                true \
	-tcp_retrans_collapse                    true \
	-inter_packet_granular_delay             0.0 \
	-llm_hdr_gap_ns                          10 \
	-tcp_large_icwnd                         0 \
	-tcp_rmem_default                        4096 \
	-tcp_keepalive_probes                    9 \
	-tcp_mem_high                            49152 \
	-tcp_tw_reuse                            false \
	-delayed_acks_timeout                    0 \
	-tcp_vegas_gamma                         2 \
	-delayed_acks                            true \
	-tcp_synack_retries                      5 \
	-tcp_timestamps                          true \
	-tcp_reordering                          3 \
	-rps_needed                              false \
	-tcp_sack                                true \
	-tcp_bic_fast_convergence                1 \
	-tcp_bic_low_window                      14 

set DNS_13 [::IxLoad new ixNetDnsPlugin]

# ixNet objects need to be added in the list before they are configured!
$Network1 globalPlugins.appendItem -object $DNS_13



$DNS_13 hostList.clear



$DNS_13 searchList.clear



$DNS_13 nameServerList.clear



$DNS_13 config \
	-domain                                  "" \
	-_Stale                                  false \
	-timeout                                 30 

set Meshing_6 [::IxLoad new ixNetMeshingPlugin]

# ixNet objects need to be added in the list before they are configured!
$Network1 globalPlugins.appendItem -object $Meshing_6



$Meshing_6 trafficMaps.clear



$Meshing_6 config -_Stale false

$Network1 config \
	-comment                                 "" \
	-name                                    "Network1" \
	-lineSpeed                               "Default" \
	-aggregation                             0 

set Ethernet_13 [$Network1 getL1Plugin]



set my_ixNetDataCenterSettings [::IxLoad new ixNetDataCenterSettings]

$my_ixNetDataCenterSettings dcPfcMapping.clear



$my_ixNetDataCenterSettings config \
	-dcSupported                             true \
	-dcEnabled                               false \
	-dcPfcPauseDelay                         1 \
	-_Stale                                  false \
	-dcMode                                  2 \
	-dcPfcPauseEnable                        false \
	-dcFlowControl                           0 

set my_ixNetEthernetELMPlugin [::IxLoad new ixNetEthernetELMPlugin]

$my_ixNetEthernetELMPlugin config \
	-negotiationType                         "master" \
	-_Stale                                  false \
	-negotiateMasterSlave                    true 

set my_ixNetDualPhyPlugin [::IxLoad new ixNetDualPhyPlugin]

$my_ixNetDualPhyPlugin config \
	-medium                                  "auto" \
	-_Stale                                  false 

$Ethernet_13 childrenList.clear



set MAC_VLAN_13 [::IxLoad new ixNetL2EthernetPlugin]

# ixNet objects need to be added in the list before they are configured!
$Ethernet_13 childrenList.appendItem -object $MAC_VLAN_13



$MAC_VLAN_13 childrenList.clear



set IP_13 [::IxLoad new ixNetIpV4V6Plugin]

# ixNet objects need to be added in the list before they are configured!
$MAC_VLAN_13 childrenList.appendItem -object $IP_13



$IP_13 childrenList.clear



$IP_13 extensionList.clear



$IP_13 config -_Stale false

$MAC_VLAN_13 extensionList.clear



$MAC_VLAN_13 config -_Stale false

$Ethernet_13 extensionList.clear



$Ethernet_13 config \
	-advertise10Full                         true \
	-directedAddress                         "01:80:C2:00:00:01" \
	-autoNegotiate                           true \
	-advertise100Half                        true \
	-advertise10Half                         true \
	-enableFlowControl                       false \
	-_Stale                                  false \
	-speed                                   "k100FD" \
	-advertise1000Full                       true \
	-advertise100Full                        true \
	-dataCenter                              $my_ixNetDataCenterSettings \
	-cardElm                                 $my_ixNetEthernetELMPlugin \
	-cardDualPhy                             $my_ixNetDualPhyPlugin 

#################################################
# Setting the ranges starting with the plugins that need to be script gen first
#################################################
$IP_13 rangeList.clear

set IP_R7 [::IxLoad new ixNetIpV4V6Range]

# ixNet objects need to be added in the list before they are configured.
$IP_13 rangeList.appendItem -object $IP_R7



$IP_R7 config \
	-count                                   1 \
	-enableGatewayArp                        false \
	-randomizeSeed                           1407313856 \
	-generateStatistics                      false \
	-autoIpTypeEnabled                       false \
	-autoCountEnabled                        false \
	-enabled                                 true \
	-autoMacGeneration                       true \
	-publishStats                            false \
	-incrementBy                             "0.0.0.1" \
	-prefix                                  24 \
	-_Stale                                  false \
	-gatewayIncrement                        "0.0.0.0" \
	-gatewayIncrementMode                    "perSubnet" \
	-mss                                     1460 \
	-randomizeAddress                        false \
	-gatewayAddress                          "10.53.173.28" \
	-ipAddress                               "10.53.173.151" \
	-ipType                                  "IPv4" 

set MAC_R7 [$IP_R7 getLowerRelatedRange "MacRange"]

$MAC_R7 config \
	-count                                   1 \
	-enabled                                 true \
	-mtu                                     1500 \
	-mac                                     "00:0A:35:AD:97:00" \
	-_Stale                                  false \
	-incrementBy                             "00:00:00:00:00:01" 

set VLAN_R7 [$IP_R7 getLowerRelatedRange "VlanIdRange"]

$VLAN_R7 config \
	-incrementStep                           1 \
	-innerIncrement                          1 \
	-uniqueCount                             4094 \
	-firstId                                 1 \
	-tpid                                    "0x8100" \
	-idIncrMode                              2 \
	-enabled                                 false \
	-innerFirstId                            1 \
	-innerIncrementStep                      1 \
	-priority                                1 \
	-_Stale                                  false \
	-increment                               1 \
	-innerTpid                               "0x8100" \
	-innerUniqueCount                        4094 \
	-innerEnable                             false \
	-innerPriority                           1 

#################################################
# Creating the IP Distribution Groups
#################################################
$IP_13 rangeGroups.clear



set DistGroup1 [::IxLoad new ixNetRangeGroup]

# ixNet objects need to be added in the list before they are configured!
$IP_13 rangeGroups.appendItem -object $DistGroup1



# ixNet objects need to be added in the list before they are configured.
$DistGroup1 rangeList.appendItem -object $IP_R7



$DistGroup1 config \
	-distribType                             0 \
	-_Stale                                  false \
	-name                                    "DistGroup1" 

$Traffic1_Network1 config \
	-enable                                  1 \
	-tcpAccelerationAllowedFlag              true \
	-network                                 $Network1 

#################################################
# Activity HTTPClient1 of NetTraffic Traffic1@Network1
#################################################
set Activity_HTTPClient1 [$Traffic1_Network1 activityList.appendItem -protocolAndType "HTTP Client"]

set my_ixAdvancedIteration [::IxLoad new ixAdvancedIteration]

$my_ixAdvancedIteration segmentList.clear

set Linear_Segment_1 [::IxLoad new ixLinearTimeSegment]

$Linear_Segment_1 config \
	-duration                                15 \
	-noiseAmplitudeScale                     0 \
	-objectiveScaleDelta                     1.0 

$my_ixAdvancedIteration segmentList.appendItem -object $Linear_Segment_1



set Linear_Segment_2 [::IxLoad new ixLinearTimeSegment]

$Linear_Segment_2 config \
	-duration                                30 \
	-noiseAmplitudeScale                     0 \
	-objectiveScaleDelta                     0.0 

$my_ixAdvancedIteration segmentList.appendItem -object $Linear_Segment_2



set Linear_Segment_3 [::IxLoad new ixLinearTimeSegment]

$Linear_Segment_3 config \
	-duration                                10 \
	-noiseAmplitudeScale                     0 \
	-endObjectiveScale                       0.0 

$my_ixAdvancedIteration segmentList.appendItem -object $Linear_Segment_3



#################################################
# Timeline1 for activities HTTPClient1
#################################################
set Timeline1 [::IxLoad new ixTimeline]

$Timeline1 config \
	-rampUpValue                             1 \
	-rampUpType                              0 \
	-offlineTime                             10 \
	-rampDownTime                            10 \
	-standbyTime                             0 \
	-rampDownValue                           0 \
	-iterations                              1 \
	-rampUpInterval                          10 \
	-sustainTime                             30 \
	-timelineType                            1 \
	-name                                    "Timeline1" \
	-advancedIteration                       $my_ixAdvancedIteration 

$Activity_HTTPClient1 config \
	-secondaryConstraintValue                100 \
	-enable                                  true \
	-name                                    "HTTPClient1" \
	-userIpMapping                           "1:1" \
	-enableConstraint                        false \
	-timerGranularity                        100 \
	-secondaryEnableConstraint               false \
	-constraintValue                         100 \
	-userObjectiveValue                      20000 \
	-secondaryConstraintType                 "TransactionRateConstraint" \
	-constraintType                          "ConnectionRateConstraint" \
	-userObjectiveType                       "simulatedUsers" \
	-destinationIpMapping                    "Consecutive" \
	-timeline                                $Timeline1 

$Activity_HTTPClient1 agent.actionList.clear

set my_ixHttpCommand [::IxLoad new ixHttpCommand]

$my_ixHttpCommand config \
	-profile                                 -1 \
	-enableDi                                0 \
	-namevalueargs                           "" \
	-useSsl                                  0 \
	-pingFreq                                10 \
	-streamIden                              3 \
	-destination                             "10.72.2.3:80" \
	-sendMD5ChkSumHeader                     0 \
	-windowSize                              "65536" \
	-cmdName                                 "Get 1" \
	-method                                  -1 \
	-commandType                             "GET" \
	-abort                                   "None" \
	-arguments                               "" \
	-sslProfile                              -1 \
	-pageObject                              "index.html" \
	-sendingChunkSize                        "None" 

$Activity_HTTPClient1 agent.actionList.appendItem -object $my_ixHttpCommand



set my_ixHttpCommand1 [::IxLoad new ixHttpCommand]

$my_ixHttpCommand1 config \
	-profile                                 -1 \
	-enableDi                                0 \
	-namevalueargs                           "" \
	-useSsl                                  0 \
	-pingFreq                                10 \
	-streamIden                              3 \
	-destination                             "10.72.2.3:80" \
	-sendMD5ChkSumHeader                     0 \
	-windowSize                              "65536" \
	-cmdName                                 "Get 2" \
	-method                                  -1 \
	-commandType                             "GET" \
	-abort                                   "None" \
	-arguments                               "" \
	-sslProfile                              -1 \
	-pageObject                              "index.html" \
	-sendingChunkSize                        "None" 

$Activity_HTTPClient1 agent.actionList.appendItem -object $my_ixHttpCommand1



$Activity_HTTPClient1 agent.headerList.clear

set my_ixHttpHeaderString [::IxLoad new ixHttpHeaderString]

$my_ixHttpHeaderString config -data "Accept: */*"

$Activity_HTTPClient1 agent.headerList.appendItem -object $my_ixHttpHeaderString



set my_ixHttpHeaderString1 [::IxLoad new ixHttpHeaderString]

$my_ixHttpHeaderString1 config -data "Accept-Language: en-us"

$Activity_HTTPClient1 agent.headerList.appendItem -object $my_ixHttpHeaderString1



set my_ixHttpHeaderString2 [::IxLoad new ixHttpHeaderString]

$my_ixHttpHeaderString2 config -data "Accept-Encoding: gzip, deflate"

$Activity_HTTPClient1 agent.headerList.appendItem -object $my_ixHttpHeaderString2



set my_ixHttpHeaderString3 [::IxLoad new ixHttpHeaderString]

$my_ixHttpHeaderString3 config -data "User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)"

$Activity_HTTPClient1 agent.headerList.appendItem -object $my_ixHttpHeaderString3



$Activity_HTTPClient1 agent.profileList.clear

$Activity_HTTPClient1 agent.methodProfileList.clear

$Activity_HTTPClient1 agent.sslProfileList.clear

$Activity_HTTPClient1 agent.config \
	-cmdListLoops                            0 \
	-vlanPriority                            0 \
	-validateCertificate                     0 \
	-enableDecompressSupport                 0 \
	-exactTransactions                       0 \
	-enableHttpsProxy                        0 \
	-perHeaderPercentDist                    0 \
	-enableSsl                               0 \
	-enablePerConnCookieSupport              0 \
	-cookieRejectProbability                 0.0 \
	-enableUnidirectionalClose               0 \
	-httpsTunnel                             "0.0.0.0" \
	-piggybackAck                            1 \
	-maxPersistentRequests                   1 \
	-enableEsm                               0 \
	-certificate                             "" \
	-sequentialSessionReuse                  0 \
	-browserEmulationName                    "Custom1" \
	-enableSslSendCloseNotify                0 \
	-cookieJarSize                           10 \
	-dontUseUpgrade                          0 \
	-maxPipeline                             1 \
	-contentLengthDeviationTolerance         0 \
	-caCert                                  "" \
	-maxSessions                             3 \
	-enableHttpProxy                         0 \
	-disableDnsResolutionCache               0 \
	-enableTrafficDistributionForCC          0 \
	-enableTos                               0 \
	-precedenceTOS                           0 \
	-ipPreference                            2 \
	-maxHeaderLen                            1024 \
	-flowPercentage                          100.0 \
	-maxStreams                              1 \
	-reliabilityTOS                          0 \
	-sslRecordSize                           "16384" \
	-privateKey                              "" \
	-commandTimeout                          600 \
	-enablemetaRedirectSupport               0 \
	-delayTOS                                0 \
	-enableIntegrityCheckSupport             0 \
	-commandTimeout_ms                       0 \
	-privateKeyPassword                      "" \
	-urlStatsCount                           10 \
	-followHttpRedirects                     0 \
	-tcpCloseOption                          0 \
	-enableVlanPriority                      0 \
	-esm                                     1460 \
	-httpVersion                             0 \
	-enablesslRecordSize                     0 \
	-sslReuseMethod                          0 \
	-sslVersion                              3 \
	-enableLargeHeader                       0 \
	-throughputTOS                           0 \
	-enableCookieSupport                     0 \
	-enableConsecutiveIpsPerSession          0 \
	-clientCiphers                           "DEFAULT" \
	-enableHttpsTunnel                       0 \
	-enableAchieveCCFirst                    0 \
	-tos                                     0 \
	-httpProxy                               "0.0.0.0" \
	-keepAlive                               0 \
	-enableCRCCheckSupport                   0 \
	-httpsProxy                              "0.0.0.0" 

$Activity_HTTPClient1 agent.cmdPercentagePool.percentageCommandList.clear

$Activity_HTTPClient1 agent.cmdPercentagePool.config -seed 1

$Traffic1_Network1 traffic.config -name "Traffic1"

$Traffic1_Network1 setPortOperationModeAllowed $::ixPort(kOperationModeThroughputAcceleration) false

$Traffic1_Network1 setPortOperationModeAllowed $::ixPort(kOperationModeFCoEOffload) true

$Traffic1_Network1 setPortOperationModeAllowed $::ixPort(kOperationModeL23) true

$Traffic1_Network1 setTcpAccelerationAllowed $::ixAgent(kTcpAcceleration) true

$Originate elementList.appendItem -object $Traffic1_Network1



$Originate config -name "Originate"

$Scenario1 columnList.appendItem -object $Originate



set DUT [::IxLoad new ixTrafficColumn]

$DUT elementList.clear

$DUT config -name "DUT"

$Scenario1 columnList.appendItem -object $DUT



set Terminate [::IxLoad new ixTrafficColumn]

$Terminate elementList.clear

$Terminate config -name "Terminate"

$Scenario1 columnList.appendItem -object $Terminate



$Scenario1 appMixList.clear

$Scenario1 links.clear

$Scenario1 config -name "Scenario1"

$Test1 config \
	-comment                                 "" \
	-csvInterval                             2 \
	-networkFailureThreshold                 0 \
	-name                                    "Test1" \
	-downgradeAppLibFlowsToLatestValidVersion true \
	-statsRequired                           true \
	-enableResetPorts                        false \
	-statViewThroughputUnits                 "Kbps" \
	-isFrameSizeDistributionViewSupported    false \
	-csvThroughputScalingFactor              1000 \
	-enableForceOwnership                    false \
	-enableReleaseConfigAfterRun             false \
	-activitiesGroupedByObjective            false \
	-enableNetworkDiagnostics                false \
	-enableFrameSizeDistributionStats        false \
	-allowMixedObjectiveTypes                false \
	-currentUniqueIDForAgent                 41 \
	-enableTcpAdvancedStats                  false \
	-profileDirectory                        $profileDirectory \
	-eventHandlerSettings                    $my_ixEventHandlerSettings \
	-captureViewOptions                      $my_ixViewOptions 

#################################################
# Session Specific Settings
#################################################
set my_ixNetMacSessionData [$Test1 getSessionSpecificData "L2EthernetPlugin"]

$my_ixNetMacSessionData config \
	-_Stale                                  false \
	-duplicateCheckingScope                  2 

set my_ixNetIpSessionData [$Test1 getSessionSpecificData "IpV4V6Plugin"]

$my_ixNetIpSessionData config \
	-enableGatewayArp                        false \
	-ignoreUnresolvedIPs                     false \
	-individualARPTimeOut                    500 \
	-maxOutstandingGatewayArpRequests        300 \
	-_Stale                                  false \
	-sendAllRequests                         false \
	-gatewayArpRequestRate                   300 \
	-duplicateCheckingScope                  2 

#################################################
# Create the test controller to run the test
#################################################
set testController [::IxLoad new ixTestController  -outputDir true]



$testController setResultDir "RESULTS\\sample_ixload_final_http"

set NS statCollectorUtils

set test_server_handle [$testController getTestServerHandle]
${NS}::Initialize -testServerHandle $test_server_handle

${NS}::ClearStats
$Test1 clearGridStats

set HTTP_Client_Per_URL_StatList { \
{ "HTTP Client Per URL" "HTTP Requests Sent" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (Provisional)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (Write)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (Read)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (Bad Header)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (4xx)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (400)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (401)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (403)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (404)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (407)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (408)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (4xx other)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (5xx)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (505)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (5xx other)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (other)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (Timeout)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Failed (Aborted)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Aborted Before Request" "kSum" } \
{ "HTTP Client Per URL" "HTTP Aborted After Request" "kSum" } \
{ "HTTP Client Per URL" "HTTP Responses Received With Match" "kSum" } \
{ "HTTP Client Per URL" "HTTP Responses Received Without Match" "kSum" } \
{ "HTTP Client Per URL" "HTTP Intermediate Responses Received (1xx)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (2xx)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (3xx)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (301)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (302)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (303)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Requests Successful (307)" "kSum" } \
{ "HTTP Client Per URL" "HTTP Content-MD5 Requests Sent" "kSum" } \
{ "HTTP Client Per URL" "HTTP Chunk Encoded Headers Received" "kSum" } \
{ "HTTP Client Per URL" "HTTP Chunk Encoded Responses Successful" "kSum" } \
{ "HTTP Client Per URL" "HTTP Chunk Encoded Responses Failed" "kSum" } \
{ "HTTP Client Per URL" "HTTP Total Chunks Received" "kSum" } \
{ "HTTP Client Per URL" "HTTP Average Chunk Size" "kWeightedAverage" } \
{ "HTTP Client Per URL" "HTTP Average Chunks per Response" "kWeightedAverage" } \
{ "HTTP Client Per URL" "HTTP Chunk Encoded Requests Sent" "kSum" } \
{ "HTTP Client Per URL" "HTTP Total Chunks Sent" "kSum" } \
{ "HTTP Client Per URL" "HTTP Average Chunk Size in Request" "kWeightedAverage" } \
{ "HTTP Client Per URL" "HTTP Average Chunks per Request" "kWeightedAverage" } \
{ "HTTP Client Per URL" "Name1-Value1" "kString" } \
{ "HTTP Client Per URL" "Counter1" "kSum" } \
{ "HTTP Client Per URL" "Name2-Value2" "kString" } \
{ "HTTP Client Per URL" "Counter2" "kSum" } \
{ "HTTP Client Per URL" "Name3-Value3" "kString" } \
{ "HTTP Client Per URL" "Counter3" "kSum" } \
{ "HTTP Client Per URL" "Name4-Value4" "kString" } \
{ "HTTP Client Per URL" "Counter4" "kSum" } \
{ "HTTP Client Per URL" "Name5-Value5" "kString" } \
{ "HTTP Client Per URL" "Counter5" "kSum" } \
{ "HTTP Client Per URL" "Name6-Value6" "kString" } \
{ "HTTP Client Per URL" "Counter6" "kSum" } \
{ "HTTP Client Per URL" "Name7-Value7" "kString" } \
{ "HTTP Client Per URL" "Counter7" "kSum" } \
{ "HTTP Client Per URL" "Name8-Value8" "kString" } \
{ "HTTP Client Per URL" "Counter8" "kSum" } \
{ "HTTP Client Per URL" "Name9-Value9" "kString" } \
{ "HTTP Client Per URL" "Counter9" "kSum" } \
{ "HTTP Client Per URL" "Name10-Value10" "kString" } \
{ "HTTP Client Per URL" "Counter10" "kSum" } \
{ "HTTP Client Per URL" "HTTP Gzip-Encoded Responses Received" "kSum" } \
{ "HTTP Client Per URL" "HTTP Gzip-Encoded Responses Successful" "kSum" } \
{ "HTTP Client Per URL" "HTTP Gzip-Encoded Responses Failed" "kSum" } \
{ "HTTP Client Per URL" "HTTP Deflate-Encoded Responses Received" "kSum" } \
{ "HTTP Client Per URL" "HTTP Deflate-Encoded Responses Successful" "kSum" } \
{ "HTTP Client Per URL" "HTTP Deflate-Encoded Responses Failed" "kSum" } \
{ "HTTP Client Per URL" "HTTP Content-MD5 Responses Received" "kSum" } \
{ "HTTP Client Per URL" "HTTP Content-MD5 Responses Successful" "kSum" } \
{ "HTTP Client Per URL" "HTTP Content-MD5 Responses Failed" "kSum" } \
{ "HTTP Client Per URL" "HTTP Custom MD5 Responses Received" "kSum" } \
{ "HTTP Client Per URL" "HTTP Custom MD5 Responses Successful" "kSum" } \
{ "HTTP Client Per URL" "HTTP Custom MD5 Responses Failed" "kSum" } \
{ "HTTP Client Per URL" "Average Compression Ratio" "kWeightedAverage" } \
}

set HTTP_Client_StatList { \
{ "HTTP Client" "HTTP Simulated Users" "kSum" } \
{ "HTTP Client" "HTTP Concurrent Connections" "kSum" } \
{ "HTTP Client" "HTTP Connections" "kSum" } \
{ "HTTP Client" "HTTP Connection Attempts" "kSum" } \
{ "HTTP Client" "HTTP Connection Aborts" "kSum" } \
{ "HTTP Client" "HTTP Old Session Aborts" "kSum" } \
{ "HTTP Client" "HTTP Transactions" "kSum" } \
{ "HTTP Client" "HTTP Bytes" "kSum" } \
{ "HTTP Client" "HTTP Requests Sent" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (Provisional)" "kSum" } \
{ "HTTP Client" "HTTP Intermediate Responses Received (1xx)" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (2xx)" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (3xx)" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (301)" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (302)" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (303)" "kSum" } \
{ "HTTP Client" "HTTP Requests Successful (307)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (Write)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (Read)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (Bad Header)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (4xx)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (400)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (401)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (403)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (404)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (407)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (408)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (4xx other)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (5xx)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (505)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (5xx other)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (other)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (Timeout)" "kSum" } \
{ "HTTP Client" "HTTP Requests Failed (Aborted)" "kSum" } \
{ "HTTP Client" "HTTP Session Timeouts (408)" "kSum" } \
{ "HTTP Client" "HTTP Request Precondition Failed (412)" "kSum" } \
{ "HTTP Client" "HTTP Sessions Rejected (503)" "kSum" } \
{ "HTTP Client" "HTTP Aborted Before Request" "kSum" } \
{ "HTTP Client" "HTTP Aborted After Request" "kSum" } \
{ "HTTP Client" "HTTP Transactions Active" "kSum" } \
{ "HTTP Client" "HTTP Users Active" "kSum" } \
{ "HTTP Client" "Content-Encoded Responses Received" "kSum" } \
{ "HTTP Client" "Gzip Content-Encoding Received" "kSum" } \
{ "HTTP Client" "Deflate Content-Encoding Received" "kSum" } \
{ "HTTP Client" "Unrecognized Content-Encoding Received" "kSum" } \
{ "HTTP Client" "Content-Encoded Responses Decode Successful" "kSum" } \
{ "HTTP Client" "Gzip Content-Encoding Decode Successful" "kSum" } \
{ "HTTP Client" "Deflate Content-Encoding Decode Successful" "kSum" } \
{ "HTTP Client" "Content-Encoded Responses Decode Failed" "kSum" } \
{ "HTTP Client" "Gzip Content-Encoding Decode Failed" "kSum" } \
{ "HTTP Client" "Deflate Content-Encoding Decode Failed" "kSum" } \
{ "HTTP Client" "Gzip Content-Encoding Decode Failed - Data Error" "kSum" } \
{ "HTTP Client" "Gzip Content-Encoding Decode Failed - Decoding Error" "kSum" } \
{ "HTTP Client" "Deflate Content-Encoding Decode Failed - Data Error" "kSum" } \
{ "HTTP Client" "Deflate Content-Encoding Decode Failed - Decoding Error" "kSum" } \
{ "HTTP Client" "Chunked Transfer-Encoded Headers Received" "kSum" } \
{ "HTTP Client" "Chunked Transfer-Encoding Decode Successful" "kSum" } \
{ "HTTP Client" "Chunked Transfer-Encoding Decode Failed" "kSum" } \
{ "HTTP Client" "Total Chunks Received" "kSum" } \
{ "HTTP Client" "Chunked Transfer-Encoding Headers Sent" "kSum" } \
{ "HTTP Client" "Total Chunks Sent" "kSum" } \
{ "HTTP Client" "Content-MD5 Responses Received" "kSum" } \
{ "HTTP Client" "Content-MD5 Check Successful" "kSum" } \
{ "HTTP Client" "Content-MD5 Check Failed" "kSum" } \
{ "HTTP Client" "Custom-MD5 Responses Received" "kSum" } \
{ "HTTP Client" "Custom-MD5 Check Successful" "kSum" } \
{ "HTTP Client" "Custom-MD5 Check Failed" "kSum" } \
{ "HTTP Client" "HTTP Bytes Sent" "kSum" } \
{ "HTTP Client" "HTTP Bytes Received" "kSum" } \
{ "HTTP Client" "HTTP Content Bytes Sent" "kSum" } \
{ "HTTP Client" "HTTP Content Bytes Received" "kSum" } \
{ "HTTP Client" "HTTP Decompressed Content Bytes Received" "kSum" } \
{ "HTTP Client" "HTTP Cookies Received" "kSum" } \
{ "HTTP Client" "HTTP Cookies Sent" "kSum" } \
{ "HTTP Client" "HTTP Cookies Rejected" "kSum" } \
{ "HTTP Client" "HTTP Cookies Rejected - (Path Match Failed)" "kSum" } \
{ "HTTP Client" "HTTP Cookies Rejected - (Domain Match Failed)" "kSum" } \
{ "HTTP Client" "HTTP Cookies Rejected - (Cookiejar Overflow)" "kSum" } \
{ "HTTP Client" "HTTP Cookies Rejected - (Probabilistic Reject)" "kSum" } \
{ "HTTP Client" "HTTP Cookie headers Rejected - (Memory Overflow)" "kSum" } \
{ "HTTP Client" "HTTP Connect Time (us)" "kWeightedAverage" } \
{ "HTTP Client" "HTTP Time To First Byte (us)" "kWeightedAverage" } \
{ "HTTP Client" "HTTP Time To Last Byte (us)" "kWeightedAverage" } \
{ "HTTP Client" "HTTP Old Session Abort Delay - Average (us)" "kWeightedAverage" } \
{ "HTTP Client" "HTTP Old Session Abort Delay - Minimum (us)" "kSum" } \
{ "HTTP Client" "HTTP Old Session Abort Delay - Maximum (us)" "kSum" } \
{ "HTTP Client" "HTTP Client Total Data Integrity Check Failed" "kSum" } \
{ "HTTP Client" "HTTP Client Total Data Integrity Check Succeeded" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Data Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Header Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Priority Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Reset Stream Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Settings Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Push Promise Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Ping Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Go Away Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Window Update Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Continuation Frames Received" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Data Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Header Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Priority Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Reset Stream Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Settings Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Push Promise Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Ping Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Go Away Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Window Update Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Continuation Frames Sent" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Streams Initiated by Client" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Streams Initiated by Server" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Streams Succeeded (Client to Server)" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Streams Succeeded (Server to Client)" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Streams Failed (Client to Server)" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Streams Failed (Server to Client)" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Connection Upgrade Succeeded" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Connection Upgrade Failed" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Protocol Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Internal Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Flow Control Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Settings Timeout Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Stream Closed Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Frame Size Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Refused Stream Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Stream Cancelled Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Compression Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Connect Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Enhance Calm Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 Inadequate Security Error" "kSum" } \
{ "HTTP Client" "HTTP Client HTTP2.0 HTTP1_1 Required Error" "kSum" } \
{ "HTTP Client" "SSL Alerts Received" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (close_notify)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (close_notify)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (unexpected_message)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (unexpected_message)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (bad_record_mac)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (bad_record_mac)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (decryption_failed)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (decryption_failed)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (record_overflow)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (record_overflow)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (decompression_failure)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (decompression_failure)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (handshake_failure)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (handshake_failure)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (no_certificate)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (no_certificate)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (bad_certificate)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (bad_certificate)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (unsupported_certificate)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (unsupported_certificate)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (certificate_revoked)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (certificate_revoked)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (certificate_expired)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (certificate_expired)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (certificate_unknown)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (certificate_unknown)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (illegal_parameter)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (illegal_parameter)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (unknown_ca)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (unknown_ca)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (access_denied)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (access_denied)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (decode_error)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (decode_error)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (decrypt_error)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (decrypt_error)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (export_restriction)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (export_restriction)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (protocol_version)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (protocol_version)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (insufficient_security)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (insufficient_security)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (internal_error)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (internal_error)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (user_canceled)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (user_canceled)" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (no_renegotiation)" "kSum" } \
{ "HTTP Client" "SSL Alerts Sent (no_renegotiation)" "kSum" } \
{ "HTTP Client" "SSL Errors Received (undefined error)" "kSum" } \
{ "HTTP Client" "SSL Errors Sent (undefined error)" "kSum" } \
{ "HTTP Client" "SSL Errors Received (no cipher)" "kSum" } \
{ "HTTP Client" "SSL Errors Sent (no cipher)" "kSum" } \
{ "HTTP Client" "SSL Errors Received (no certificate)" "kSum" } \
{ "HTTP Client" "SSL Errors Sent (no certificate)" "kSum" } \
{ "HTTP Client" "SSL Errors Received (bad certificate)" "kSum" } \
{ "HTTP Client" "SSL Errors Sent (bad certificate)" "kSum" } \
{ "HTTP Client" "SSL Errors Received (unsupported certificate)" "kSum" } \
{ "HTTP Client" "SSL Errors Sent (unsupported certificate)" "kSum" } \
{ "HTTP Client" "SSL Errors Received" "kSum" } \
{ "HTTP Client" "SSL Errors Sent" "kSum" } \
{ "HTTP Client" "Client Hello Sent" "kSum" } \
{ "HTTP Client" "Client Hello Received" "kSum" } \
{ "HTTP Client" "Server Hello Sent" "kSum" } \
{ "HTTP Client" "Server Hello Received" "kSum" } \
{ "HTTP Client" "Hello Requests Sent" "kSum" } \
{ "HTTP Client" "Hello Requests Received" "kSum" } \
{ "HTTP Client" "SSL Session Reuse Success" "kSum" } \
{ "HTTP Client" "SSL Session Reuse Failed" "kSum" } \
{ "HTTP Client" "SSL Concurrent Sessions" "kSum" } \
{ "HTTP Client" "SSL Bytes Sent" "kSum" } \
{ "HTTP Client" "SSL Bytes Received" "kSum" } \
{ "HTTP Client" "SSL Throughput Bytes" "kSum" } \
{ "HTTP Client" "SSL Application Data Bytes" "kSum" } \
{ "HTTP Client" "SSL Certificate Validation Failure" "kSum" } \
{ "HTTP Client" "SSL Certificate Self Signed" "kSum" } \
{ "HTTP Client" "SSL Certificate CA Signed" "kSum" } \
{ "HTTP Client" "SSL Alerts Received (unrecognized name)" "kSum" } \
{ "HTTP Client" "SSL SNI extension sent successfully" "kSum" } \
{ "HTTP Client" "SSL SNI extension mismatch" "kSum" } \
{ "HTTP Client" "SSL session ticket reuse success" "kSum" } \
{ "HTTP Client" "SSL session ticket reuse failure" "kSum" } \
{ "HTTP Client" "SSL Negotiation Finished Successfully" "kSum" } \
{ "HTTP Client" "TCP SYN Sent" "kSum" } \
{ "HTTP Client" "TCP SYN_SYN-ACK Received" "kSum" } \
{ "HTTP Client" "TCP SYN Failed" "kSum" } \
{ "HTTP Client" "TCP SYN-ACK Sent" "kSum" } \
{ "HTTP Client" "TCP Connection Requests Failed" "kSum" } \
{ "HTTP Client" "TCP Connections Established" "kSum" } \
{ "HTTP Client" "TCP FIN Sent" "kSum" } \
{ "HTTP Client" "TCP FIN Received" "kSum" } \
{ "HTTP Client" "TCP FIN-ACK Sent" "kSum" } \
{ "HTTP Client" "TCP FIN-ACK Received" "kSum" } \
{ "HTTP Client" "TCP Resets Sent" "kSum" } \
{ "HTTP Client" "TCP Resets Received" "kSum" } \
{ "HTTP Client" "TCP Retries" "kSum" } \
{ "HTTP Client" "TCP Timeouts" "kSum" } \
{ "HTTP Client" "TCP Accept Queue Entries" "kSum" } \
{ "HTTP Client" "TCP Listen Queue Drops" "kSum" } \
{ "HTTP Client" "TCP Connections in ESTABLISHED State" "kSum" } \
{ "HTTP Client" "TCP Connections in SYN-SENT State" "kSum" } \
{ "HTTP Client" "TCP Connections in SYN-RECEIVED State" "kSum" } \
{ "HTTP Client" "TCP Connections in FIN-WAIT-1 State" "kSum" } \
{ "HTTP Client" "TCP Connections in FIN-WAIT-2 State" "kSum" } \
{ "HTTP Client" "TCP Connections in TIME-WAIT State" "kSum" } \
{ "HTTP Client" "TCP Connections in CLOSE STATE" "kSum" } \
{ "HTTP Client" "TCP Connections in CLOSE-WAIT State" "kSum" } \
{ "HTTP Client" "TCP Connections in LAST-ACK State" "kSum" } \
{ "HTTP Client" "TCP Connections in LISTENING State" "kSum" } \
{ "HTTP Client" "TCP Connections in CLOSING State" "kSum" } \
{ "HTTP Client" "TCP Internally Aborted Connections" "kSum" } \
}

set statList [ concat $HTTP_Client_Per_URL_StatList $HTTP_Client_StatList]

set count 1

foreach stat $statList {
	set caption [format "Watch_Stat_%s"  $count]
	set statSourceType [lindex $stat 0]
	set statName [lindex $stat 1]
	set aggregationType [lindex $stat 2]
	${NS}::AddStat \
	-filterList                              {} \
	-caption                                 $caption \
	-statSourceType                          $statSourceType \
	-statName                                $statName \
	-aggregationType                         $aggregationType 
	incr count
}

proc ::my_stat_collector_command {args} {
	puts "====================================="
	puts "INCOMING STAT RECORD >>> $args"
	puts "====================================="
}
${NS}::StartCollector -command ::my_stat_collector_command -interval 2

$testController run $Test1

vwait ::ixTestControllerMonitor
puts $::ixTestControllerMonitor

${NS}::StopCollector

#################################################
# Cleanup
#################################################
# Release config is only strictly necessary if enableReleaseConfigAfterRun is 0.
$testController releaseConfig

vwait ::ixTestControllerMonitor
puts $::ixTestControllerMonitor

$Test1 clearDUTList

$Traffic1_Network1 removeAllPortsFromAnalyzer

::IxLoad delete $chassisChain

::IxLoad delete $Test1

::IxLoad delete $profileDirectory

::IxLoad delete $my_ixEventHandlerSettings

::IxLoad delete $my_ixViewOptions

::IxLoad delete $Scenario1

::IxLoad delete $Originate

::IxLoad delete $Traffic1_Network1

::IxLoad delete $Network1

::IxLoad delete $Settings_13

::IxLoad delete $Filter_13

::IxLoad delete $GratARP_13

::IxLoad delete $TCP_13

::IxLoad delete $DNS_13

::IxLoad delete $Meshing_6

::IxLoad delete $Ethernet_13

::IxLoad delete $my_ixNetDataCenterSettings

::IxLoad delete $my_ixNetEthernetELMPlugin

::IxLoad delete $my_ixNetDualPhyPlugin

::IxLoad delete $MAC_VLAN_13

::IxLoad delete $IP_13

::IxLoad delete $IP_R7

::IxLoad delete $MAC_R7

::IxLoad delete $VLAN_R7

::IxLoad delete $DistGroup1

::IxLoad delete $Activity_HTTPClient1

::IxLoad delete $Timeline1

::IxLoad delete $my_ixAdvancedIteration

::IxLoad delete $Linear_Segment_1

::IxLoad delete $Linear_Segment_2

::IxLoad delete $Linear_Segment_3

::IxLoad delete $my_ixHttpCommand

::IxLoad delete $my_ixHttpCommand1

::IxLoad delete $my_ixHttpHeaderString

::IxLoad delete $my_ixHttpHeaderString1

::IxLoad delete $my_ixHttpHeaderString2

::IxLoad delete $my_ixHttpHeaderString3

::IxLoad delete $DUT

::IxLoad delete $Terminate

::IxLoad delete $my_ixNetMacSessionData

::IxLoad delete $my_ixNetIpSessionData

::IxLoad delete $testController


#################################################
# Disconnect / Release application lock
#################################################
}] {
	$logger error $errorInfo
	puts $errorInfo
}

::IxLoad disconnect
