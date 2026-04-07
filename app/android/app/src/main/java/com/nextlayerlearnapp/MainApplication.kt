package com.nextlayerlearnapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.margelo.nitro.JNIOnLoad
import com.margelo.nitro.NitroModulesPackage

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList = packageListWithNitroFirst(PackageList(this).packages),
    )
  }

  override fun onCreate() {
    super.onCreate()
    // Nitro extension libs (e.g. react-native-audio-recorder-player) load native code in static
    // initializers when packages are constructed. Core Nitro must be loaded first.
    JNIOnLoad.initializeNativeNitro()
    loadReactNative(this)
  }

  private fun packageListWithNitroFirst(packages: List<ReactPackage>): List<ReactPackage> {
    val nitro = packages.filterIsInstance<NitroModulesPackage>().singleOrNull() ?: return packages
    val nitroIndex = packages.indexOf(nitro)
    if (nitroIndex == 1) return packages
    return buildList(packages.size) {
      add(packages.first())
      add(nitro)
      for (i in 1 until packages.size) {
        if (i != nitroIndex) add(packages[i])
      }
    }
  }
}
