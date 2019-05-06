<#macro adminLayout>
<!DOCTYPE html>
<html lang="en">
    <head>
        <#include "head.ftl"/>
    </head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">&nbsp;&nbsp;Demo</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                </div>
            </div>
        </nav>

        <div class="container-fluid">
                <div class="col-sm-12 col-sm-offset-3 col-md-12 col-md-offset-2 main">
                    <#nested />
                </div>
        </div>
        <#include "footer.ftl"/>
        <div id="_system_info"class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: none;">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="mySmallModalLabel">提示</h4>
                    </div>
                    <div class="modal-body break-word">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>
    </body>
</html>










</#macro>