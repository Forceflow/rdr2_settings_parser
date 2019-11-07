// RDR2 settings.xml parser by Jeroen Baert (based on my previous GTAV settings parser)
// https://github.com/Forceflow/rdr2_settings_parser

// LIVE VERSION AT: http://www.forceflow.be/temp/rdr2_settings_parser/

var $xml;
var valid_xml = true;

// define value -> setting translation
var MAP_ANISO = {}; MAP_ANISO["0"] = "Off";MAP_ANISO["1"] = "2x";MAP_ANISO["2"] = "4x";MAP_ANISO["3"] = "8x";MAP_ANISO["4"] = "16x";
var REFL_MSAA = {}; REFL_MSAA["0"] = "Off";REFL_MSAA["1"] = "2x";REFL_MSAA["2"] = "4x";REFL_MSAA["3"] = "8x";

$( document ).ready(function() {
    watcharea();
});

function getValuefromXML(a){
	return $xml.find(a).attr("value");
}

function getTextfromXML(a){
	return $xml.find(a).text();
}

function int_to_yesno(value){
	if(value == 0){return "Yes";}else{return "No";}
}

function bool_to_onoff(value){
	if(value = "true"){return "On";}
	if(value = "false"){return "Off";}
	return "undefined";
}

function watcharea(){
	$('textarea#inifile').on('change',function(){
		parse();
	});
	$('textarea#inifile').keyup(function(){
		parse();
	});
}

function parseXML() {
	valid_xml = true;
	var inifile = $('textarea#inifile').val();
	if(inifile == ""){
		valid_xml = false;
		return;
	} try {
		var xmlDoc = $.parseXML( inifile );
	} catch(err) {
		valid_xml = false;
		return;
	}
	$xml = $( xmlDoc );
}

function writeLine(line){
	$("#parsed").val($("#parsed").val() + line + "\n");
}

function writeSettings(){
	// Screen and API settings
	var width = getValuefromXML("screenWidth");
	var height = getValuefromXML("screenHeight");
	var refreshrate = getValuefromXML("refreshRateNumerator");
	var vsync = int_to_yesno(getValuefromXML("Vsync"));
	var windowed = int_to_yesno(getValuefromXML("Windowed"));
	var triplebuffer = int_to_yesno(getValuefromXML("tripleBuffered"));
	var pauseonfocusloss = int_to_yesno(getValuefromXML("pauseOnFocusLoss"));
	var videocard = getTextfromXML("videoCardDescription");
	var api = getTextfromXML("API").split("_")[1];
	writeLine(videocard + ", " + api);
	writeLine(width + " x " + height + ", " + refreshrate + "hz, Windowed: " + windowed + ", Vsync: " + vsync + ", Triple: " +triplebuffer);
	writeLine("");

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
	var fxaa = int_to_yesno(getValuefromXML("fxaaEnabled"));
	var taa = getTextfromXML("taa").split("_")[1];
	var msaa = getValuefromXML("msaa");

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
	writeLine("");

	// ADVANCED SETTINGS
	var locked = getValuefromXML("locked");
	writeLine("Advanced Settings Locked: " + locked)
	// if(locked == "true"){return;} // we stop here: advanced settings have been locked.

	var near_volum = getTextfromXML("volumetricsLightingQuality").split("_")[1]; // Todo: check correctness
	var far_volum = getTextfromXML("volumetricsRaymarchQuality").split("_")[1]; // Todo: check correctness
	var volum_quality = getTextfromXML("volumetricsLightingQuality").split("_")[1];
	var particle_lighting = getTextfromXML("particleLightingQuality").split("_")[1];
	var unlock_volum_res = bool_to_onoff(getValuefromXML("volumetricsRaymarchResolutionUnclamped"));
	var soft_shadows = getTextfromXML("shadowSoftShadows").split("_")[1];
	var grass_shadows = getTextfromXML("shadowGrassShadows").split("_")[1];
	var long_shadows = bool_to_onoff(getValuefromXML("shadowLongShadows"));
	var full_res_ssao = bool_to_onoff(getValuefromXML("ssaoFullScreenEnabled"));
	var water_refraction = getTextfromXML("waterRefractionQuality").split("_")[1];
	var water_reflection = getTextfromXML("waterReflectionQuality").split("_")[1];
	var water_physics_quality = getValuefromXML("waterSimulationQuality");
	var res_scale = getTextfromXML("scalingMode").split("_")[1]; // TODO: parse this better
	var taa_sharp = getValuefromXML("sharpenIntensity");
	var motion_blur = bool_to_onoff(getValuefromXML("motionBlur"));
	var refl_msaa = MAP_ANISO[getValuefromXML("reflectionMSAA")];
	var geometry_lod = "TODO"; // I think it's lodScale, but that doesn't scale linearly?
	var grass_lod = getValuefromXML("grassLod");
	var tree = getTextfromXML("treeQuality").split("_")[1];
	var pom = getTextfromXML("POMQuality").split("_")[1];
	var decal = getTextfromXML("decalQuality").split("_")[1];
	var fur = getTextfromXML("furDisplayQuality").split("_")[1];

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
	writeLine("Water Physics Quality: " + water_physics_quality + " (range 0-4)");
	writeLine("Resolution scale: " + res_scale);
	writeLine("TAA Sharpen Intensity: " + taa_sharp + " (range 0-1)");
	writeLine("Motion Blur: " + motion_blur);
	writeLine("Reflection MSAA: " + refl_msaa);
	writeLine("Geometry Level of Detail: " + geometry_lod);
	writeLine("Grass Level of Detail: " + grass_lod + " (range 0-1)");
	writeLine("Tree Quality: " + tree);
	writeLine("Parallax Occlusion Mapping Quality: " + pom);
	writeLine("Decal Quality: " + decal);
	writeLine("Fur Quality: " + fur);
}

function parse(){
	$("#parsed").val('');
	parseXML();
	if(!valid_xml){
		writeLine("No XML or invalid XML pasted. Make sure you paste the full contents of your settings.xml file in the area on the left!");
		return;
	}
	writeSettings();
	writeLine(" ");
	writeLine("Generated with Forceflow's RDR2 settings parser");
}

function loadExample(){
	var client = new XMLHttpRequest();
	client.open('GET', 'system.xml');
	client.onreadystatechange = function() {$('textarea#inifile').val(client.responseText); parse();}
	client.send();
}
