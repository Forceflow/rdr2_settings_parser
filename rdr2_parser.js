// RDR2 system.xml parser by Jeroen Baert (based on my previous GTAV settings parser)
// https://github.com/Forceflow/rdr2_settings_parser

// LIVE VERSION AT: http://www.forceflow.be/temp/rdr2_settings_parser/

// GLOBALS
var CURRENT_XML_VERSION = 37; // the RAGE engine XML version this parser is currently written for
var $xml;
var valid_xml = true;

// define value -> setting translation
var MAP_ANISO = {}; MAP_ANISO["0"] = "Off"; MAP_ANISO["1"] = "2x"; MAP_ANISO["2"] = "4x"; MAP_ANISO["3"] = "8x"; MAP_ANISO["4"] = "16x";
var REFL_MSAA = {}; REFL_MSAA["0"] = "Off"; REFL_MSAA["1"] = "2x"; REFL_MSAA["2"] = "4x"; REFL_MSAA["3"] = "8x";

// If the HTML loaded, start watching that input area
$(document).ready(function () {watcharea();});

// get a nice date string
function getDate(){
	var d = new Date();
	var date = d.toISOString().slice(0,10);
	var time = d.getHours() + ":" + d.getMinutes();
	return date+" "+time;
}

// convert range to percentage
function range_to_percent(val,min,max){
	if (typeof val === 'undefined'){return "undefined";}
	var percentage = (val-min)/(max-min) * 100;
	return Math.floor(percentage) + "%";
}

// convert integer to yes or no answer
function int_to_yesno(value) {
	if (typeof value === 'undefined'){return "undefined";}
	var a = value.trim();
	if (a == "1") { return "Yes"; } else if(a == "0") { return "No"; } else { return "undefined";}
}

// convert boolean to on or off
function bool_to_onoff(value) {
	if (typeof value === 'undefined'){return "undefined";}
	var a = value.trim();
	if (a === 'true') { return "On"; }
	if (a === 'false') { return "Off"; }
	return "undefined";
}

// get value from the XML (for example, from <motionBlur value="true" />)
function getValuefromXML(a) {
	return $xml.find(a).attr("value");
}

// get text from XML tag (for example from <waterLightingQuality>kSettingLevel_Ultra</waterLightingQuality>)
function getTextfromXML(a) {
	return $xml.find(a).text();
}

// convert the resolution scale value, which is of the form "ModeXoY", to a percentage
function resolutionScale(value){
	if (typeof value === 'undefined'){return "undefined";}
	numbers = value.match(/\d+/g);
	if(numbers.length != 2){return value;} // More than 2 numbers found. I'm out, just return that value.
	var ratio = parseFloat(numbers[0]) / parseFloat(numbers[1]);
	var percentage = Math.round((ratio*100));
	return percentage + "%";
}

// function to watch the input area for changes
function watcharea() {
	$('textarea#inifile').on('change', function () {parse();});
	$('textarea#inifile').keyup(function () {parse();});
}

// attempt to parse the current input area content to XML
function parseXML() {
	valid_xml = true;
	var inifile = $('textarea#inifile').val();
	if (inifile == "") {
		valid_xml = false;
		return;
	} try {
		var xmlDoc = $.parseXML(inifile);
	} catch (err) {
		valid_xml = false;
		return;
	}
	$xml = $(xmlDoc);
}

// write a (newline-terminated) line to the output area
function writeLine(line) {
	$("#parsed").val($("#parsed").val() + line + "\n");
}

// fetch and write all parsed settings
function writeSettings() {
	// Screen and API settings
	var width = getValuefromXML("screenWidth");
	var height = getValuefromXML("screenHeight");
	var refreshrate = getValuefromXML("refreshRateNumerator");
	var vsync = int_to_yesno(getValuefromXML("vSync"));
	var windowed = int_to_yesno(getValuefromXML("windowed"));
	var triplebuffer = bool_to_onoff(getValuefromXML("tripleBuffered"));
	var pauseonfocusloss = int_to_yesno(getValuefromXML("pauseOnFocusLoss"));
	var videocard = getTextfromXML("videoCardDescription");
	var api = getTextfromXML("API").split("_")[1];
	// MAIN SETTINGS
	var textures = getTextfromXML("textureQuality").split("_")[1];
	var anisotropic = MAP_ANISO[getValuefromXML("anisotropicFiltering")];
	var lighting = getTextfromXML("lightingQuality").split("_")[1];
	var globillum = getTextfromXML("ambientLightingQuality").split("_")[1];
	var shadows = getTextfromXML("shadowQuality").split("_")[1];
	var farshadows = getTextfromXML("farShadowQuality").split("_")[1];
	var ssao = getTextfromXML("ssao").split("_")[1];
	var reflection = getTextfromXML("reflectionQuality").split("_")[1];
	var mirror = getTextfromXML("mirrorQuality").split("_")[1];
	var water = getTextfromXML("waterQuality").split("_")[1];
	var volumetrics = getTextfromXML("volumetricsQuality").split("_")[1];
	var particle = getTextfromXML("particleQuality").split("_")[1];
	var tessellation = getTextfromXML("tessellation").split("_")[1];
	var fxaa = bool_to_onoff(getValuefromXML("fxaaEnabled"));
	var taa = getTextfromXML("taa").split("_")[1];
	var msaa = getValuefromXML("msaa");
	// ADVANCED SETTINGS
	var locked = getValuefromXML("locked");

	// Doesn't seem to be this value
	// var near_volum = getTextfromXML("volumetricsLightingQuality").split("_")[1];
	// Fix 2020-02-22
	var near_volum = getTextfromXML("scatteringVolumeQuality").split("_")[1];
	var far_volum = getTextfromXML("volumetricsRaymarchQuality").split("_")[1];
	var volum_quality = getTextfromXML("volumetricsLightingQuality").split("_")[1];
	var particle_lighting = getTextfromXML("particleLightingQuality").split("_")[1];
	var unlock_volum_res = bool_to_onoff(getValuefromXML("volumetricsRaymarchResolutionUnclamped"));
	var soft_shadows = getTextfromXML("shadowSoftShadows").split("_")[1];
	var grass_shadows = getTextfromXML("shadowGrassShadows").split("_")[1];
	var long_shadows = bool_to_onoff(getValuefromXML("shadowLongShadows"));
	var full_res_ssao = bool_to_onoff(getValuefromXML("ssaoFullScreenEnabled"));
	var water_refraction = getTextfromXML("waterRefractionQuality").split("_")[1];
	var water_reflection = getTextfromXML("waterReflectionQuality").split("_")[1];
	var water_physics_quality = range_to_percent(getValuefromXML("waterSimulationQuality"),0,4);
	var res_scale = resolutionScale(getTextfromXML("scalingMode").split("_")[1]);
	var taa_sharp = range_to_percent(getValuefromXML("sharpenIntensity"),0,1);
	var motion_blur = bool_to_onoff(getValuefromXML("motionBlur"));
	var refl_msaa = MAP_ANISO[getValuefromXML("reflectionMSAA")];
	var geometry_lod = range_to_percent(getValuefromXML("lodScale"), 0.75, 1);
	var grass_lod = range_to_percent(getValuefromXML("grassLod"),0.5,3);
	var tree = getTextfromXML("treeQuality").split("_")[1];
	var pom = getTextfromXML("POMQuality").split("_")[1];
	var decal = getTextfromXML("decalQuality").split("_")[1];
	var fur = getTextfromXML("furDisplayQuality").split("_")[1];
	var tree_tessellation = bool_to_onoff(getValuefromXML("treeTessellationEnabled"));
	// Unlisted settings
	var async = bool_to_onoff(getValuefromXML("asyncComputeEnabled"));
	var snowglints = bool_to_onoff(getValuefromXML("snowGlints"));
	var xmlversion = parseInt(getValuefromXML("version"));
	var deepsurface = getTextfromXML("deepsurfaceQuality").split("_")[1];

	// WRITE EVERYTHING (NORMAL MODE)
	if ($("#quote").is(":checked")) { writeLine("[QUOTE]"); }
	writeLine(videocard + ", " + api);
	writeLine(width + " x " + height + ", " + refreshrate + "hz, Windowed: " + windowed + ", Vsync: " + vsync + ", Triple: " + triplebuffer);
	writeLine("");
	writeLine("Texture Quality: " + textures);
	writeLine("Anisotropic Filtering: " + anisotropic);
	writeLine("Lighting Quality: " + lighting);
	writeLine("Global Illumination Quality: " + globillum);
	writeLine("Shadow Quality: " + shadows);
	writeLine("Far Shadow Quality: " + farshadows);
	writeLine("Screen Space Ambient Occlusion: " + ssao);
	writeLine("Reflection Quality: " + reflection);
	writeLine("Mirror Quality: " + mirror);
	writeLine("Water Quality: " + water);
	writeLine("Volumetrics Quality: " + volumetrics);
	writeLine("Particle Quality: " + particle);
	writeLine("Tessellation Quality: " + tessellation);
	writeLine("TAA: " + taa + ", FXAA: " + fxaa + ", MSAA: " + msaa);
	writeLine("");
	writeLine("Near Volumetric Resolution: " + near_volum);
	writeLine("Far Volumetric Resolution: " + far_volum);
	writeLine("Volumetric Lighting Quality: " + volum_quality);
	writeLine("Unlocked Volumetric Raymarch Resolution: " + unlock_volum_res);
	writeLine("Particle Lighting Quality: " + particle_lighting);
	writeLine("Soft Shadows: " + soft_shadows);
	writeLine("Grass Shadows: " + grass_shadows);
	writeLine("Long Shadows: " + long_shadows);
	writeLine("Full Resolution Screen Space Ambient Occlusion: " + full_res_ssao);
	writeLine("Water Refraction Quality: " + water_refraction)
	writeLine("Water Reflection Quality: " + water_reflection)
	writeLine("Water Physics Quality: " + water_physics_quality);
	writeLine("Resolution scale: " + res_scale);
	writeLine("TAA Sharpening: " + taa_sharp);
	writeLine("Motion Blur: " + motion_blur);
	writeLine("Reflection MSAA: " + refl_msaa);
	writeLine("Geometry Level of Detail: " + geometry_lod);
	writeLine("Grass Level of Detail: " + grass_lod);
	writeLine("Tree Quality: " + tree);
	writeLine("Parallax Occlusion Mapping Quality: " + pom);
	writeLine("Decal Quality: " + decal);
	writeLine("Fur Quality: " + fur);
	writeLine("Tree Tessellation: " + tree_tessellation);

	// Write unlisted settings
	if ($("#unlisted").is(":checked")) { 
		writeLine(" ");
		writeLine("Async Compute: " + async)
		writeLine("Snow Glints: " + snowglints)
		writeLine("Deepsurface Quality: " + deepsurface)
	}
	// Add little flair footer
	if ($("#flair").is(":checked")) { 
		writeLine(" ");
		writeLine("Generated on " + getDate() + " with Forceflow's RDR2 settings parser (https://rdr2.forceflow.be)");
	}
	// Check XML version
	if (($("#checkversion").is(":checked")) && (xmlversion != CURRENT_XML_VERSION)) {
		writeLine(" ");
		writeLine("Warning: this parser was written for the latest system.xml version, " + CURRENT_XML_VERSION + ". Your system.xml file is of version " + xmlversion
		+ ". Update your RDR2 installation to get better / more complete results.")
	} 

	// Close quote tags if necessary
	if ($("#quote").is(":checked")) { writeLine("[/QUOTE]"); }
}

function parse() {
	// Clear value
	$("#parsed").val('');
	// Attempt to parse input
	parseXML();
	// Catch invalid XML
	if (!valid_xml) {
		if($('textarea#inifile').val() == "(Paste the contents of your system.xml file here, or load it from disk)"){
			writeLine("(A nicely formatted text block will appear here)");
		} else {
			writeLine("Could not parse your input. Make sure you paste the full contents (beginning to end) of your system.xml file in the area on the left!");
			writeLine("");
			writeLine("Even one missed '<' or unclosed tag can make the XML invalid and un-parseable. :)");
		}
		return;
	}
	// All good, let's extract settings
	writeSettings();
}

function loadExample() {
	var client = new XMLHttpRequest();
	client.open('GET', 'system.xml');
	client.onreadystatechange = function () { $('textarea#inifile').val(client.responseText); parse(); }
	client.send();
}

function clearInput(){
	$('textarea#inifile').val("(Paste the contents of your system.xml file here)");
	$("#parsed").val("(A nicely formatted text block will appear here)");
}

function copyclipboard(){
	$("#parsed").select();
	document.execCommand('copy');
}

var loadFile = function (event) {
	var reader = new FileReader();
	console.log(event);
	reader.onload = function () {
		$("#parsed").val("");
		$('textarea#inifile').val(reader.result);
		parse();
	};
	reader.onerror = function () {
		$('textarea#inifile').val("(Something went wrong trying to load your XML file from disk. Try just pasting the contents here.)");
	}
	reader.readAsText(event.target.files[0]);
};

function savetofile(){
    var text = $("#parsed").val();
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "rdr2_settings_parsed_"+getDate()+".txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
 }




