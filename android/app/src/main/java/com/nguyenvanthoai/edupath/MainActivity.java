package com.nguyenvanthoai.edupath;
import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = (WebView) this.getBridge().getWebView();
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
    }
}
