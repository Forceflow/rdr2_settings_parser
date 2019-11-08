// RDR2 settings.xml parser by Jeroen Baert (based on my previous GTAV settings parser)
// https://github.com/Forceflow/rdr2_settings_parser

// LIVE VERSION AT: http://www.forceflow.be/temp/rdr2_settings_parser/

var $xml;
var valid_xml = true;

// define value -> setting translation
var MAP_ANISO = {}; MAP_ANISO["0"] = "Off"; MAP_ANISO["1"] = "2x"; MAP_ANISO["2"] = "4x"; MAP_ANISO["3"] = "8x"; MAP_ANISO["4"] = "16x";
var REFL_MSAA = {}; REFL_MSAA["0"] = "Off"; REFL_MSAA["1"] = "2x"; REFL_MSAA["2"] = "4x"; REFL_MSAA["3"] = "8x";

$(document).ready(function () {watcharea();});

function range_to_percent(val,min,max){
	var percentage = (val-min)/(max-min) * 100;
	return Math.floor(percentage) + "%";
}

function getValuefromXML(a) {
	return $xml.find(a).attr("value");
}

function getTextfromXML(a) {
	return $xml.find(a).text();
}

function int_to_yesno(value) {
	var a = value.trim();
	if (a == "1") { return "Yes"; } else if(a == "0") { return "No"; } else { return "undefined";}
}

function bool_to_onoff(value) {
	var a = value.trim();
	if (a === 'true') { return "On"; }
	if (a === 'false') { return "Off"; }
	return "undefined";
}

function resolutionScale(value){
	// string is always of form "ModeXoY"
	numbers = value.match(/\d+/g);
	if(numbers.length != 2){return value;} // More than 2 numbers found. I'm out, just return that value.
	var ratio = parseFloat(numbers[0]) / parseFloat(numbers[1]);
	var percentage = Math.round((ratio*100));
	return percentage + "%";
}

function watcharea() {
	$('textarea#inifile').on('change', function () {parse();});
	$('textarea#inifile').keyup(function () {parse();});
}

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

function writeLine(line) {
	$("#parsed").val($("#parsed").val() + line + "\n");
}

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
	var near_volum = getTextfromXML("volumetricsLightingQuality").split("_")[1];
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
	var grass_lod = range_to_percent(getValuefromXML("grassLod"),0,3);
	var tree = getTextfromXML("treeQuality").split("_")[1];
	var pom = getTextfromXML("POMQuality").split("_")[1];
	var decal = getTextfromXML("decalQuality").split("_")[1];
	var fur = getTextfromXML("furDisplayQuality").split("_")[1];

	// WRITE EVERYTHING (NORMAL MODE)
	if ($("#quote").is(":checked")) { writeLine("[QUOTE]"); }
	writeLine(videocard + ", " + api);
	writeLine(width + " x " + height + ", " + refreshrate + "hz, Windowed: " + windowed + ", Vsync: " + vsync + ", Triple: " + triplebuffer);
	writeLine("");
	writeLine("Textures: " + textures);
	writeLine("Anisotropic: " + anisotropic);
	writeLine("Lighting: " + lighting);
	writeLine("Global Illumination: " + globillum);
	writeLine("Shadows: " + shadows);
	writeLine("Far Shadows: " + farshadows);
	writeLine("SSAO: " + ssao);
	writeLine("Reflection: " + reflection);
	writeLine("Mirror: " + mirror);
	writeLine("Water: " + water);
	writeLine("Volumetrics: " + volumetrics);
	writeLine("Particles: " + particle);
	writeLine("Tessellation: " + tessellation);
	writeLine("FXAA: " + fxaa + ", TAA: " + taa + ", MSAA: " + msaa);
	if (locked == "true" && $("#hide_advanced").is(":checked")) { if ($("#quote").is(":checked")) { writeLine("[/QUOTE]"); } return; } // we stop here: advanced settings have been locked.
	writeLine("");
	writeLine("Near Volumetrics Quality: " + near_volum);
	writeLine("Far Volumetric Quality: " + far_volum);
	writeLine("Volumetric Lighting Quality: " + volum_quality);
	writeLine("Unlocked Volumetric Raymarch Resolution: " + unlock_volum_res);
	writeLine("Particle Lighting Quality: " + particle_lighting);
	writeLine("Soft Shadows: " + soft_shadows);
	writeLine("Grass Shadows: " + grass_shadows);
	writeLine("Long Shadows: " + long_shadows);
	writeLine("Full resolution SSAO: " + full_res_ssao);
	writeLine("Water Refraction Quality: " + water_refraction)
	writeLine("Water Reflection Quality: " + water_reflection)
	writeLine("Water Physics Quality: " + water_physics_quality);
	writeLine("Resolution scale: " + res_scale);
	writeLine("TAA Sharpen Intensity: " + taa_sharp);
	writeLine("Motion Blur: " + motion_blur);
	writeLine("Reflection MSAA: " + refl_msaa);
	writeLine("Geometry Level of Detail: " + geometry_lod);
	writeLine("Grass Level of Detail: " + grass_lod);
	writeLine("Tree Quality: " + tree);
	writeLine("Parallax Occlusion Mapping Quality: " + pom);
	writeLine("Decal Quality: " + decal);
	writeLine("Fur Quality: " + fur);

	writeLine(" ");
	writeLine("Generated with Forceflow's RDR2 settings parser");
	if ($("#quote").is(":checked")) { writeLine("[/QUOTE]"); }
}

function parse() {
	// Clear value
	$("#parsed").val('');
	// Attempt to parse input
	parseXML();
	// Catch invalid XML
	if (!valid_xml) {
		if($('textarea#inifile').val() == "(Paste the contents of your system.xml file here)"){
			writeLine("(A nicely formatted text block will appear here)");
		} else {
			writeLine("Could not parse your input. Make sure you paste the full contents of your settings.xml file in the area on the left!");
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




