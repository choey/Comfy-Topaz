from .topaz import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS
import os
import shutil
import __main__

WEB_DIRECTORY = "./web"
__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

# ensure extensions_path exists
extentions_path = os.path.join(os.path.dirname(os.path.realpath(__main__.__file__)), "web", "extensions", "topaz")
if not os.path.exists(extentions_path):
    os.makedirs(extentions_path)

# copy all *.js files from js_path to extesnions_path
js_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "web", "js")
for file in os.listdir(js_path):
    if file.endswith(".js"):
        src_file = os.path.join(js_path, file)
        dst_file = os.path.join(extentions_path, file)
        if os.path.exists(dst_file):
            os.remove(dst_file)
        shutil.copy(src_file, dst_file)
        print('installed %s to %s' % (file, extentions_path))