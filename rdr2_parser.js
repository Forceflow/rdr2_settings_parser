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

function yesorno(value){
	if(value == 0){return "yes";}else{return "no";}
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
	$("#parsed").val($("#parsed").val() + line + "  \n");
}

function writeSettings(){
	// Screen and API settings
	var width = getValuefromXML("screenWidth");
	var height = getValuefromXML("screenHeight");
	var refreshrate = getValuefromXML("refreshRateNumerator");
	var vsync = yesorno(getValuefromXML("Vsync"));
	var windowed = yesorno(getValuefromXML("Windowed"));
	var triplebuffer = yesorno(getValuefromXML("tripleBuffered"));
	var pauseonfocusloss = yesorno(getValuefromXML("pauseOnFocusLoss"));
	var videocard = getTextfromXML("videoCardDescription");
	var api = getTextfromXML("API").split("_")[1];
	writeLine(videocard + ", " + api);
	writeLine(width + " x " + height + ", " + refreshrate + "hz, Windowed: " + windowed + ", Vsync: " + vsync + ", Triple: " +triplebuffer);

	// Main settings
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

	var fxaa = yesorno(getValuefromXML("fxaaEnabled"));
	var taa = getTextfromXML("taa").split("_")[1];
	var msaa = getValuefromXML("msaa");

	writeLine("FXAA: " + fxaa + ", TAA : " + taa + ", MSAA: " + msaa);
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
