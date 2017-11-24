#
# Set up paths to IxLoad tcl code relative to install directory
# This script does nothing unless it is running on a windows platform
# (*nix scripters must set up their own auto_path)
#
if {$::tcl_platform(platform) == "windows"} {
#    source [file normalize ../../bin/IxiaWish.tcl]
	#source [file normalize ../bin/IxiaWish.tcl]
	source [file normalize "C:\\Program Files (x86)\\Ixia\\IxLoad\\8.10-EA\\TclScripts\\bin\\IxiaWish.tcl"]
}

