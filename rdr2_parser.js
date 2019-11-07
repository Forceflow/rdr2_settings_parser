// GTA 5 settings.xml parser by Jeroen Baert
// https://github.com/Forceflow/gta5settingsparser

var $xml;

// define value -> setting translation
var MAP_ANISO = {}; MAP_ANISO["0"] = "Off";MAP_ANISO["1"] = "2x";MAP_ANISO["2"] = "4x";MAP_ANISO["3"] = "8x";MAP_ANISO["4"] = "16x";

var valid_xml = true;

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

	// ADVANCED SETTINGS
	var locked = getValuefromXML("locked");
	writeLine("ADVANCED SETTINGS Locked: " + locked)
	if(locked == "true"){return;} // we stop here: advanced settings have been locked.

	var near_volum = "TODO";
	var far_volum = "TODO";
	var volum_quality = getTextfromXML("volumetricsLightingQuality").split("_")[1];
	var particle_lighting = getTextfromXML("particleLightingQuality").split("_")[1];
	var unlock_volum_res = bool_to_onoff(getValuefromXML("volumetricsRaymarchResolutionUnclamped"));
	var soft_shadows = getTextfromXML("shadowSoftShadows").split("_")[1];
	var grass_shadows = getTextfromXML("shadowGrassShadows").split("_")[1];
	var long_shadows = bool_to_onoff(getValuefromXML("shadowLongShadows"));
	var full_res_ssao = bool_to_onoff(getValuefromXML("ssaoFullScreenEnabled"));
	var water_refraction = getTextfromXML("waterRefractionQuality").split("_")[1];
	var water_reflection = getTextfromXML("waterReflectionQuality").split("_")[1];
	var water_physics_quality = "TODO - value is " + getValuefromXML("waterSimulationQuality");
	var res_scale = "TODO - value is " + getTextfromXML("scalingMode").split("_")[1];
	var taa_sharp = getValuefromXML("sharpenIntensity");

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
